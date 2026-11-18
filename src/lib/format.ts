const MONTH = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });

const DAY = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "nov 2026" from an ISO day, lowercase to match the site's voice. */
export const month = (isoDay: string) => MONTH.format(new Date(isoDay)).toLowerCase();

/** "nov 17, 2026" from an ISO day or timestamp. */
export const day = (iso: string) => DAY.format(new Date(iso)).toLowerCase();

export const count = (value: number) => value.toLocaleString('en');

/** The year of an ISO day, for the index's last column. */
export const year = (isoDay: string) => isoDay.slice(0, 4);

/** A project name cut after each dot and dash, where a line may break (trending.upvote.at, not trending.upvote.a/t). */
export const nameParts = (name: string) => name.split(/(?<=[.-])/);
