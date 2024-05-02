export async function sha256(str: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    // @ts-expect-error no errors here
    new TextEncoder("utf-8").encode(str)
  );
  return Array.prototype.map
    .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
    .join("");
}

/**
 * Convert a date to a relative time string, such as
 * "a minute ago", "in 2 hours", "yesterday", "3 months ago", etc.
 * using Intl.RelativeTimeFormat
 */
export function getRelativeTimeString(
  date: Date | number,
  style: Intl.RelativeTimeFormatOptions["style"] = "short",
  lang = navigator.language
): string {
  // Allow dates or times to be passed
  const timeMs = typeof date === "number" ? date : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat(lang, {
    numeric: "auto",
    style,
  });
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}

export function cancelScrolling() {
  function handleScrollCancel(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
  window.addEventListener("scroll", handleScrollCancel, { capture: true });
  window.addEventListener("wheel", handleScrollCancel, { capture: true });

  return () => {
    window.removeEventListener("scroll", handleScrollCancel, { capture: true });
    window.removeEventListener("wheel", handleScrollCancel, { capture: true });
  };
}

export function log(...args: any[]) {
  console.debug("[LIVE FEEDBACK]", new Date(), ...args);
}
