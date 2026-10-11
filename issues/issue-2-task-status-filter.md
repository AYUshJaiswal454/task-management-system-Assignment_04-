# [Feature] Fix task status filtering

## Problem Description
Users need to view tasks based on their workflow phase: `TODO`, `IN_PROGRESS`, or `COMPLETED`. The status filter dropdown is present in the UI, but selecting an option does not filter the task list.

## Current Behavior
The status dropdown in `TaskFilters.jsx` updates the `statusFilter` state, but in `frontend/src/hooks/useTasks.js`, `matchesStatus` unconditionally returns `true`. Consequently, selecting "To Do", "In Progress", or "Completed" leaves the list unchanged.

## Expected Behavior
- Selecting "To Do" displays only tasks with `status === 'TODO'`.
- Selecting "In Progress" displays only tasks with `status === 'IN_PROGRESS'`.
- Selecting "Completed" displays only tasks with `status === 'COMPLETED'`.
- Selecting "All Statuses" or clicking the Reset button restores all tasks.
- Works correctly in combination with search queries and priority filters.

## Acceptance Criteria
- [ ] Selecting any status filters tasks strictly by that status value.
- [ ] Selecting "ALL" restores all tasks without status restrictions.
- [ ] Combines with search filter (Issue 1) and priority filter (Issue 3).
- [ ] Preserves backend role permissions (standard users only see their assigned tasks).

## Relevant Files and Components
- `frontend/src/hooks/useTasks.js` (line ~50: `matchesStatus`)
- `frontend/src/components/TaskFilters.jsx`
- `frontend/src/pages/TasksPage.jsx`

## Steps to Reproduce
1. Log in and navigate to `/tasks`.
2. Locate the "Filter by Status" dropdown (currently displaying "All Statuses").
3. Select "Completed" from the dropdown.
4. Observe that TODO and IN_PROGRESS tasks are still displayed on the table.

## Suggested Test Cases
1. **Filter TODO:** Select "To Do" -> only tasks with the grey "To Do" badge appear.
2. **Filter IN_PROGRESS:** Select "In Progress" -> only tasks with the blue "In Progress" badge appear.
3. **Filter COMPLETED:** Select "Completed" -> only tasks with the green "Completed" badge appear.
4. **Reset:** Click "Reset" button -> all permitted tasks are restored.

## Suggested Labels
`enhancement`, `good first issue`
