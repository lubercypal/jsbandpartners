#!/bin/bash

set -e

msg="${1:-Update}"
branch="${2:-develop}"

echo "🚀 Deploying branch: $branch"

git fetch origin

git checkout "$branch"
git pull origin "$branch"

git add .

if git diff --cached --quiet; then
    echo "No changes to commit."
else
    git commit -m "$msg"
    git push origin "$branch"
fi

ssh assessment "
cd ~/domains/jsblegalgroup.com/public_html &&
git fetch origin &&
git checkout $branch &&
git reset --hard origin/$branch
"

echo ""
echo "✅ Deployment completed on branch: $branch"