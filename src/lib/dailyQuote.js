const STORAGE_KEY = "brighttrail.dailyQuote.v1";
const API_URL = "https://dummyjson.com/quotes/random";

// Used as the initial render (before the API responds) and whenever the
// network request fails, so the dashboard never shows a blank/broken state.
const FALLBACK_QUOTES = [
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" },
  { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Perseverance is not a long race; it is many short races one after another.", author: "Walter Elliot" },
];

function todayKey() {
  const now = new Date();
  const offset = now.getTimezoneOffset();
  return new Date(now.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function dayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now - start) / 86400000);
}

export function getFallbackQuoteForToday() {
  return FALLBACK_QUOTES[dayOfYear() % FALLBACK_QUOTES.length];
}

function readCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(entry) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entry));
  } catch {
    // ignore storage write failures (e.g. private-browsing quota)
  }
}

export async function fetchDailyQuote() {
  const today = todayKey();
  const cached = readCache();
  if (cached && cached.date === today) {
    return { text: cached.text, author: cached.author };
  }

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Quote request failed");
    const data = await res.json();
    const quote = { text: data.quote, author: data.author };
    writeCache({ date: today, ...quote });
    return quote;
  } catch {
    const fallback = getFallbackQuoteForToday();
    writeCache({ date: today, ...fallback });
    return fallback;
  }
}
