# [Feature] Implement task search by title and description

## Problem Description
Users and administrators need the ability to quickly locate tasks across large task backlogs by typing keywords into the search bar. Currently, typing into the search bar does not filter the task directory.

## Current Behavior
The search input field in `TaskFilters.jsx` accepts text input and updates the `searchQuery` state, but the filter predicate in `frontend/src/hooks/useTasks.js` returns `true` regardless of the query. As a result, all tasks continue to be displayed regardless of the entered search keywords.

## Expected Behavior
- The task list should filter dynamically as the user types into the search input.
- Matching should be case-insensitive.
- The filter should match against both the task `title` and `description`.
- If no tasks match the search criteria, the "No matching tasks found" empty state should be rendered.
- Search filtering must work seamlessly in combination with status and priority filters.

## Acceptance Criteria
- [ ] Typing a query filters the tasks in real-time.
- [ ] Search matches against `task.title` (case-insensitive).
- [ ] Search matches against `task.description` (case-insensitive).
- [ ] Clear/Reset button restores all tasks.
- [ ] Empty search input (`""`) returns all permitted tasks.
- [ ] Works in conjunction with other active filters.

## Relevant Files and Components
- `frontend/src/hooks/useTasks.js` (line ~43: `matchesSearch`)
- `frontend/src/components/TaskFilters.jsx`
- `frontend/src/pages/TasksPage.jsx`

## Steps to Reproduce
1. Log in as Admin (`admin@taskflow.dev` / `Admin@123456`) or User (`user@taskflow.dev` / `User@123456`).
2. Navigate to `/tasks`.
3. In the "Search tasks by title or description..." input, type `landing` or `MongoDB`.
4. Observe that all tasks remain displayed and no filtering occurs.

## Suggested Test Cases
1. **Title Match:** Search for "landing" -> only "Design high-converting landing page hero section" should be displayed.
2. **Description Match:** Search for "indexing" -> tasks with "indexing" in their description should be displayed.
3. **Case-Insensitive Match:** Search for "MONGODB" -> tasks mentioning "MongoDB" should match.
4. **No Match:** Search for "xyznonexistent" -> empty state message "No matching tasks found" should appear.
5. **Whitespace Query:** Searching for spaces only should be trimmed or treated as empty.

## Suggested Labels
`enhancement`, `good first issue`
