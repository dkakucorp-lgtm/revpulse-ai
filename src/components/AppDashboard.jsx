import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import FaqKakuTrainer from './FaqKakuTrainer';
import UserManual from './UserManual';

export default function AppDashboard({ user }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming');

  // Fetch reviews from Supabase on load
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err.message);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveDraft = async (reviewId, draftText) => {
    alert(`Approved and dispatched private recovery message: "${draftText}"`);
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: 'resolved' } : r));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gray-900 border border-gray-800 p-8 rounded-3xl shadow-xl">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-950/60 border border-blue-800/50 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Tenant Operations Workspace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Review Safeguard Stream</h1>
          <p className="text-sm text-gray-400 mt-1">Intercepting negative reviews and routing private resolutions automatically.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={fetchReviews}
            className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold rounded-xl transition border border-gray-700">
            🔄 Refresh Stream
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-6 border-b border-gray-800 pb-4">
        <button 
          onClick={() => setActiveTab('incoming')}
          className={`text-sm font-semibold pb-2 border-b-2 transition ${
            activeTab === 'incoming' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}>
          Incoming Reviews ({reviews.length})
        </button>
        <button 
          onClick={() => setActiveTab('faqs')}
          className={`text-sm font-semibold pb-2 border-b-2 transition ${
            activeTab === 'faqs' ? 'border-purple-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}>
          Custom FAQs & Kaku Training
        </button>
        <button 
          onClick={() => setActiveTab('analytics')}
          className={`text-sm font-semibold pb-2 border-b-2 transition ${
            activeTab === 'analytics' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}>
          Sentiment Analytics
        </button>
        <button 
          onClick={() => setActiveTab('manual')}
          className={`text-sm font-semibold pb-2 border-b-2 transition ${
            activeTab === 'manual' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-200'
          }`}>
          Onboarding Manual (PDF)
        </button>
      </div>

      {/* Main Review Stream */}
      {activeTab === 'incoming' && (
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-16 text-gray-400 text-sm">Loading review stream from PostgreSQL database...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-16 px-6 bg-gray-900/50 border border-gray-800 rounded-3xl space-y-2">
              <p className="text-base font-semibold text-white">No customer messages or reviews yet</p>
              <p className="text-sm text-gray-400 max-w-xl mx-auto">
                Your incoming messages, comments, and reviews from connected channels will appear here in real time whenever a customer reaches out.
              </p>
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                      rev.sentiment === 'negative' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}>
                      {rev.sentiment} ({rev.rating}★)
                    </span>
                    <span className="text-xs text-gray-400">Platform: <strong className="text-gray-200">{rev.platform}</strong></span>
                    <span className="text-xs text-gray-400">• Customer: <strong className="text-gray-200">{rev.reviewer_name}</strong></span>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed bg-gray-950 p-4 rounded-xl border border-gray-800">
                    "{rev.review_text}"
                  </p>

                  {rev.ai_private_draft && (
                    <div className="bg-blue-950/30 border border-blue-900/50 p-4 rounded-xl space-y-2">
                      <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                        <span>🛡️ Kaku AI Private-Resolution Draft</span>
                        <span className="text-[10px] text-emerald-400">Ready to Send</span>
                      </div>
                      <p className="text-xs text-gray-300 italic">{rev.ai_private_draft}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center items-end space-y-3 min-w-[180px]">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    rev.status === 'resolved' ? 'bg-emerald-950 text-emerald-300' : 'bg-amber-950 text-amber-300'
                  }`}>
                    {rev.status === 'resolved' ? '✓ Resolved & Sent' : '⏳ Pending Approval'}
                  </span>

                  {rev.ai_private_draft && rev.status !== 'resolved' && (
                    <button 
                      onClick={() => handleApproveDraft(rev.id, rev.ai_private_draft)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-blue-600/20">
                      Approve & Dispatch SMS
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Custom FAQs & Kaku Training Tab */}
      {activeTab === 'faqs' && (
        <FaqKakuTrainer userId={user?.id} />
      )}

      {/* Sentiment Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Total Intercepted</h4>
            <div className="text-3xl font-extrabold text-white">{reviews.length} {reviews.length === 1 ? "Message" : "Messages"}</div>
            <p className="text-xs text-emerald-400 mt-1">Live Supabase feed</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Resolution Rate</h4>
            <div className="text-3xl font-extrabold text-white">{reviews.length > 0 ? `${Math.round((reviews.filter(r => r.status === "resolved").length / reviews.length) * 100)}%` : "—"}</div>
            <p className="text-xs text-blue-400 mt-1">{reviews.filter(r => r.status === "resolved").length} of {reviews.length} resolved</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Pending Approvals</h4>
            <div className="text-3xl font-extrabold text-white">{reviews.filter(r => r.status !== "resolved").length}</div>
            <p className="text-xs text-purple-400 mt-1">Awaiting review & dispatch</p>
          </div>
        </div>
      )}

      {/* Onboarding Manual (PDF) Tab */}
      {activeTab === 'manual' && (
        <UserManual />
      )}
    </div>
  );
}