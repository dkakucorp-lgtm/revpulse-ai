import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function KakuAssistant({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [faqs, setFaqs] = useState([]);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'kaku',
      text: "Hi! I'm Kaku. Ask me about your connected channels, setup steps, or test how I answer customer questions using your saved business FAQs.",
    },
  ]);

  useEffect(() => {
    loadTenantFaqs();
  }, [user?.id, isOpen]);

  async function loadTenantFaqs() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const activeUserId = user?.id || sessionData?.session?.user?.id;
      if (!activeUserId) {
        setFaqs([]);
        return;
      }

      const { data, error } = await supabase
        .from('tenant_faqs')
        .select('question_text, answer_text, industry_vertical')
        .eq('user_id', activeUserId)
        .eq('is_active', true);

      if (!error && Array.isArray(data)) {
        setFaqs(data);
      }
    } catch (err) {
      console.error('Error loading FAQs for KakuAssistant:', err.message);
    }
  }

  function generateReply(queryText) {
    const cleanQuery = queryText.toLowerCase();
    const keywords = cleanQuery
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);

    let bestFaq = null;
    let bestScore = 0;

    for (const item of faqs) {
      const haystack = `${item.question_text} ${item.answer_text}`.toLowerCase();
      const score = keywords.reduce(
        (acc, word) => (haystack.includes(word) ? acc + 1 : acc),
        0
      );
      if (score > bestScore) {
        bestScore = score;
        bestFaq = item;
      }
    }

    if (bestFaq && bestScore > 0) {
      return `${bestFaq.answer_text} (Matched FAQ: "${bestFaq.question_text}")`;
    }

    if (cleanQuery.includes('connect') || cleanQuery.includes('facebook') || cleanQuery.includes('instagram')) {
      return 'To connect channels, link your Facebook Business Page or Instagram Business account in Meta settings, subscribe to messages/comments/feed webhooks, and add your IDs in your RevPulse channel settings.';
    }

    if (cleanQuery.includes('faq') || cleanQuery.includes('train')) {
      return 'Open the "Custom FAQs & Kaku Training" tab in your dashboard to pick preset answers, write custom overrides, or add new questions—then click "Save FAQs & Train Ask Kaku."';
    }

    return "I don't have a confirmed answer for that in your saved FAQs yet. You can add this question under Custom FAQs & Kaku Training so I answer it automatically next time, or have a team member follow up directly.";
  }

  function handleSend(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { id: `u-${Date.now()}`, sender: 'user', text: trimmed };
    const kakuMsg = {
      id: `k-${Date.now() + 1}`,
      sender: 'kaku',
      text: generateReply(trimmed),
    };

    setMessages((prev) => [...prev, userMsg, kakuMsg]);
    setInput('');
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-slate-100">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <img
                src="/kaku-mascot.png"
                alt="Ask Kaku"
                className="w-7 h-7 rounded-full object-cover border border-purple-500/40"
              />
              <div>
                <p className="text-sm font-bold text-white leading-tight">Ask Kaku</p>
                <p className="text-[11px] text-emerald-400">
                  {faqs.length > 0 ? `${faqs.length} custom FAQs active` : 'Ready to assist'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white text-sm px-2 py-1"
              aria-label="Close Ask Kaku"
            >
              ✕
            </button>
          </div>

          <div className="max-h-72 overflow-y-auto p-4 space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`rounded-xl px-3.5 py-2.5 leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-purple-600 text-white ml-8'
                    : 'bg-slate-800/90 text-slate-200 mr-6 border border-slate-700/60'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Kaku a question..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="ml-auto flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-xl border border-purple-400/30 transition"
      >
        <img
          src="/kaku-mascot.png"
          alt="Kaku"
          className="w-6 h-6 rounded-full object-cover"
        />
        <span>{isOpen ? 'Hide Kaku' : 'Ask Kaku'}</span>
      </button>
    </div>
  );
}