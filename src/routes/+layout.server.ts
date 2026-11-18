// Every page is built ahead of time. Directory-style URLs (/docov/ as docov/index.html) are what a plain file server
// (Caddy, on Railway) serves without rewrites, and keep slugs with dots (upvote.at) from looking like files.
export const prerender = true;

export const trailingSlash = 'always';
