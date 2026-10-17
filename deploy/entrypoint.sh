#!/bin/sh
set -eu
KP_API_ENABLED=0
KP_API_KEY=${KP_API_KEY:-}
if [ -n "$KP_API_KEY" ]; then
    case "$KP_API_KEY" in *[!a-zA-Z0-9-]*) echo 'Invalid metadata API key format' >&2; exit 1 ;; esac
    KP_API_ENABLED=1
fi
export KP_API_KEY KP_API_ENABLED
envsubst '${KP_API_KEY} ${KP_API_ENABLED}' < /etc/nginx/cinema.conf.template > /tmp/cinema.conf
unset KP_API_KEY KP_API_ENABLED
exec nginx -c /tmp/cinema.conf "$@"
