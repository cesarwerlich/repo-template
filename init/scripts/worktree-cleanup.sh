#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ "$#" -lt 1 ]; then
  echo "Usage: ./scripts/worktree-cleanup.sh <issue-number-slug-or-path>"
  exit 1
fi

ARG="$1"

if [[ "${ARG}" == .worktrees/* ]]; then
  WORKTREE_PATH="${ARG}"
else
  WORKTREE_PATH=".worktrees/${ARG}"
fi

if [ ! -d "${WORKTREE_PATH}" ]; then
  echo "Worktree not found: ${WORKTREE_PATH}"
  exit 1
fi

git worktree remove "${WORKTREE_PATH}"
git worktree prune

echo "Removed ${WORKTREE_PATH} and pruned stale entries."
