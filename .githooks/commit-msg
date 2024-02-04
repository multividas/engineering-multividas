#! /usr/bin/bash

# cd ./git/hooks
# mv commit-msg.sample commit-msg
# Don't forget to add: chmod +x .git/hooks/commit-msg

COMMIT_MESSAGE=$(cat $1)

if [[ ! $COMMIT_MESSAGE =~ ^(feat|fix|refactor|test|docs|core) ]]; then
  echo "Error: Commit message must start with one of the following keywords: feat, fix, refactor, test, docs, core."
  exit 1
fi

exit 0
