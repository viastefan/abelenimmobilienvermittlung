"use client";

import { useEffect, useState } from "react";

/**
 * Rendered after mount only: the page is statically generated, so a date
 * baked in at build time would quietly go stale — and rendering it on the
 * server would cause a hydration mismatch.
 */
export function CurrentDate({ className = "" }: { className?: string }) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Europe/Berlin",
      }).format(new Date())
    );
  }, []);

  if (!today) return <span className={className} aria-hidden="true" style={{ minWidth: "5.5rem" }} />;

  return (
    <time dateTime={today.split(".").reverse().join("-")} className={className}>
      {today}
    </time>
  );
}
