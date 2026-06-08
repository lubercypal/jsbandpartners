#!/usr/bin/env bash
set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required. Install WebP tools, then run this script again." >&2
  exit 1
fi

quality="${WEBP_QUALITY:-82}"

find assets/images -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) | while IFS= read -r source; do
  target="${source%.*}.webp"
  if [ -f "$target" ] && [ "$target" -nt "$source" ]; then
    continue
  fi

  cwebp -quiet -q "$quality" "$source" -o "$target"
  printf 'converted %s -> %s\n' "$source" "$target"
done
