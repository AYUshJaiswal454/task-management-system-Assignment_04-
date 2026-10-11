# [Feature] Add pagination to the task list

## Problem Description
As the number of tasks grows, displaying all tasks on a single screen creates performance bottlenecks and poor user experience. The task list needs functional pagination to navigate results across pages.

## Current Behavior
The pagination bar is rendered at the bottom of `/tasks` via `frontend/src/components/Pagination.jsx`. However:
- `TasksPage.jsx` does not slice the `filteredTasks` array by page size; it displays all tasks at once.
- The Previous and Next buttons in `Pagination.jsx` are disabled or non-functional.
- `totalPages` is hardcoded to `1`.
- Changing page number does not update the displayed slice of tasks.

## Expected Behavior
- Display a configurable number of tasks per page (default: 5 tasks per page).
- Dynamically compute total pages: `Math.ceil(totalItems / pageSize)` (minimum 1).
- Enable Previous button when `currentPage > 1`.
- Enable Next button when `currentPage < totalPages`.
- Display current page and total pages (e.g., `Page 1 of 3`).
- When filters or search reduce the number of matches, reset or clamp `currentPage` so users aren't left on an empty out-of-bounds page.
- Preserve role-based access restrictions (users only paginate through their permitted tasks).

## Acceptance Criteria
- [ ] Task table shows only `pageSize` items (e.g. 5) per page.
- [ ] Clicking "Next" advances to page 2 and shows the next 5 tasks.
- [ ] Clicking "Previous" returns to page 1.
- [ ] Previous button is disabled on page 1; Next button is disabled on last page.
- [ ] If total tasks is 0, appropriate empty state is shown without broken pagination numbers.
- [ ] Changing filters resets `currentPage` to 1 if the current page would be out of bounds.

## Relevant Files and Components
- `frontend/src/components/Pagination.jsx`
- `frontend/src/pages/TasksPage.jsx` (line ~55: `displayedTasks` calculation)

## Steps to Reproduce
1. Log in as Admin (`admin@taskflow.dev` / `Admin@123456`).
2. Navigate to `/tasks` (database has 8 sample tasks).
3. Notice all 8 tasks are displayed simultaneously on the table.
4. Notice the pagination controls say "Page 1 of 1" and the Next button is disabled.

## Suggested Test Cases
1. **Initial Page:** With 8 tasks and pageSize 5 -> shows 5 tasks on page 1, "Page 1 of 2".
2. **Next Page:** Click Next -> shows remaining 3 tasks on page 2.
3. **Previous Page:** Click Previous -> returns to page 1.
4. **Boundary Condition:** Previous disabled on page 1, Next disabled on page 2.

## Suggested Labels
`enhancement`, `good first issue`
