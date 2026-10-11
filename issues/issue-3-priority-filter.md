# [Feature] Implement priority filtering

## Problem Description
To organize work effectively, team members and admins must be able to filter tasks by urgency: `LOW`, `MEDIUM`, or `HIGH`. The priority filter dropdown is present in the dashboard but is currently inactive.

## Current Behavior
The priority dropdown in `TaskFilters.jsx` updates `priorityFilter` state, but in `frontend/src/hooks/useTasks.js`, `matchesPriority` returns `true` unconditionally. Selecting a priority does not affect the visible tasks.

## Expected Behavior
- Selecting "High" displays only tasks with `priority === 'HIGH'`.
- Selecting "Medium" displays only tasks with `priority === 'MEDIUM'`.
- Selecting "Low" displays only tasks with `priority === 'LOW'`.
- Selecting "All Priorities" or clicking Reset restores all tasks.
- Works in compound combination with search and status filtering.

## Acceptance Criteria
- [ ] Selecting "HIGH" isolates high-priority tasks.
- [ ] Selecting "MEDIUM" isolates medium-priority tasks.
- [ ] Selecting "LOW" isolates low-priority tasks.
- [ ] Selecting "ALL" restores the full task list.
- [ ] Functions simultaneously with search and status filters.

## Relevant Files and Components
- `frontend/src/hooks/useTasks.js` (line ~57: `matchesPriority`)
- `frontend/src/components/TaskFilters.jsx`
- `frontend/src/pages/TasksPage.jsx`

## Steps to Reproduce
1. Log in and navigate to `/tasks`.
2. Locate the "Filter by Priority" dropdown.
3. Select "High".
4. Notice that Low and Medium priority tasks remain visible.

## Suggested Test Cases
1. **Filter High:** Select "High" -> only tasks with the red "High" badge appear.
2. **Compound Filter:** Select "High" priority and "In Progress" status -> only tasks matching both appear.
3. **Reset Priority:** Switch dropdown back to "All Priorities" -> tasks of all priorities appear.

## Suggested Labels
`enhancement`, `good first issue`
