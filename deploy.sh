#!/bin/bash

set -e

msg="${1:-Update}"
branch="${2:-develop}"

if [ "$branch" != "develop" ] && [ "$branch" != "main" ]; then
    echo "❌ Only 'develop' or 'main' allowed."
    exit 1
fi

git fetch origin

if [ "$branch" = "develop" ]; then
    echo "🚧 Saving and deploying DEVELOP"

    git checkout develop
    git pull origin develop

    git add .

    if git diff --cached --quiet; then
        echo "No changes to commit."
    else
        git commit -m "$msg"
        git push origin develop
    fi

    remote_branch="develop"
fi

if [ "$branch" = "main" ]; then
    echo "⚠️  RELEASE TO MAIN"
    echo "This will merge tested develop into stable main."
    read -p "Type RELEASE to continue: " confirm

    if [ "$confirm" != "RELEASE" ]; then
        echo "❌ Release cancelled."
        exit 1
    fi

    git checkout develop
    git pull origin develop

    git checkout main
    git pull origin main

    git merge develop -m "$msg"
    git push origin main

    remote_branch="main"
fi

ssh assessment "
cd ~/domains/jsblegalgroup.com/public_html &&
git fetch origin &&
git checkout $remote_branch &&
git reset --hard origin/$remote_branch
"

echo ""
echo "✅ Completed successfully on branch: $remote_branch"