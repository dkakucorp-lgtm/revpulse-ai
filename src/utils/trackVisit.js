import { supabase } from '../components/supabaseClient';

export async function trackDailyVisit() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `rp_visit_${today}`;
    if (localStorage.getItem(storageKey)) return;

    let visitorHash = localStorage.getItem('rp_visitor_id');
    if (!visitorHash) {
      visitorHash = crypto.randomUUID();
      localStorage.setItem('rp_visitor_id', visitorHash);
    }

    const { error } = await supabase.from('site_visits').insert({
      visit_date: today,
      visitor_hash: visitorHash,
      landing_path: window.location.pathname,
      referrer: document.referrer || 'direct',
    });

    if (!error) {
      localStorage.setItem(storageKey, '1');
    }
  } catch (_e) {
    // Non-blocking analytics failure
  }
}