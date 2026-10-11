#!/usr/bin/env bash
# ==============================================================================
# TaskFlow — Automated GitHub Issues Publisher
# Creates exactly 6 GitHub issues for Assignment 4 open source contributors.
# ==============================================================================

set -e

echo "==> Checking GitHub CLI authentication status..."
if ! gh auth status >/dev/null 2>&1; then
  echo "Error: gh is not authenticated. Please run 'gh auth login' or provide a token."
  exit 1
fi

echo "==> Creating Issue 1: Task Search..."
gh issue create \
  --title "[Feature] Implement task search by title and description" \
  --body-file "issues/issue-1-task-search.md" \
  --label "enhancement,good first issue"

echo "==> Creating Issue 2: Task Status Filter..."
gh issue create \
  --title "[Feature] Fix task status filtering" \
  --body-file "issues/issue-2-task-status-filter.md" \
  --label "enhancement,good first issue"

echo "==> Creating Issue 3: Priority Filter..."
gh issue create \
  --title "[Feature] Implement priority filtering" \
  --body-file "issues/issue-3-priority-filter.md" \
  --label "enhancement,good first issue"

echo "==> Creating Issue 4: Task Form Validation..."
gh issue create \
  --title "[Bug] Add client-side task form validation" \
  --body-file "issues/issue-4-task-form-validation.md" \
  --label "bug,good first issue"

echo "==> Creating Issue 5: Admin Task Assignment..."
gh issue create \
  --title "[Feature] Complete Admin task assignment functionality" \
  --body-file "issues/issue-5-admin-task-assignment.md" \
  --label "enhancement"

echo "==> Creating Issue 6: Pagination..."
gh issue create \
  --title "[Feature] Add pagination to the task list" \
  --body-file "issues/issue-6-pagination.md" \
  --label "enhancement,good first issue"

echo "==> All 6 issues successfully created on GitHub!"
