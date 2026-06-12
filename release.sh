#!/bin/bash

set -e

msg="${1:-Release from develop to main}"

echo "🚀 Releasing develop to main"

git fetch origin

git checkout develop
git pull origin develop

git checkout main
git pull origin main

git merge develop -m "$msg"
git push origin main

ssh assessment "
cd ~/domains/jsblegalgroup.com/public_html &&
git fetch origin &&
git checkout main &&
git reset --hard origin/main
"

echo ""
echo "✅ Release completed. main is now updated from develop."