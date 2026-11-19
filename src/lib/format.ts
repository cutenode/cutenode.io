const DAY = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "nov 17, 2026" from an ISO day or timestamp, lowercase to match the site's voice. */
export const day = (iso: string) => DAY.format(new Date(iso)).toLowerCase();

/** "1 star", "2,112 stars". */
export const stars = (value: number) => `${value.toLocaleString('en')} ${value === 1 ? 'star' : 'stars'}`;

/** The year of an ISO day, for the index's last column. */
export const year = (isoDay: string) => isoDay.slice(0, 4);

/** A project name cut after each dot and dash, where a line may break (trending.upvote.at, not trending.upvote.a/t). */
export const nameParts = (name: string) => name.split(/(?<=[.-])/);
