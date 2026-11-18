const MONTH = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const DAY = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "nov 2026" from an ISO day, lowercase to match the site's voice. */
export const month = (isoDay: string) => MONTH.format(new Date(isoDay)).toLowerCase();

/** "nov 17, 2026" from an ISO day or timestamp. */
export const day = (iso: string) => DAY.format(new Date(iso)).toLowerCase();

export const count = (value: number) => value.toLocaleString('en');
