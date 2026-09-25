import { useEffect, useState } from "react";
import { fetchDailyQuote, getFallbackQuoteForToday } from "../../lib/dailyQuote";
import styles from "./DailyQuote.module.css";

export default function DailyQuote() {
  const [quote, setQuote] = useState(getFallbackQuoteForToday);

  useEffect(() => {
    let cancelled = false;
    fetchDailyQuote().then((q) => {
      if (!cancelled) setQuote(q);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <blockquote className={styles.text}>{quote.text}</blockquote>
      {quote.author && <cite className={styles.author}>— {quote.author}</cite>}
    </div>
  );
}
