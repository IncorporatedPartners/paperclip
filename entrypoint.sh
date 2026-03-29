#!/bin/sh
set -e
mkdir -p /paperclip
chown -R node:node /paperclip 2>/dev/null || true
exec runuser -u node -- "$@"
