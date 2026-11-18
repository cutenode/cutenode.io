#!/bin/sh
# Serves build/ through the Caddyfile in Caddy's own image, the way Railway serves the site, at
# http://localhost:${PORT:-4180}. `pnpm serve` and the Playwright and Lighthouse runs use it. exec hands signals
# straight to docker, which stops the container with them.
cd "$(dirname "$0")/.." || exit 1
port=${PORT:-4180}
name=cutenode-io-serve-$port

# A run that was killed outright leaves its container holding the port; it's this script's, so clear it.
docker rm -f "$name" >/dev/null 2>&1

exec docker run --rm --init --name "$name" -p "$port:8080" -e PORT=8080 \
	-v "$PWD/build:/app/build:ro" -v "$PWD/Caddyfile:/etc/caddy/Caddyfile:ro" \
	caddy:2 caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
