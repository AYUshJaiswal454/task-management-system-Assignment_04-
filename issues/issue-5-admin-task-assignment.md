# [Feature] Complete Admin task assignment functionality

## Problem Description
Admins need to delegate tasks to specific team members. While the assignee dropdown is present in the Admin task form and loads registered users, selecting an assignee does not actually attach the user when the task is saved or updated.

## Current Behavior
In `frontend/src/components/TaskForm.jsx`, the user dropdown fetches registered users from `/api/users`. However, the `payload` constructed inside `handleSubmit` omits the `assignedTo` field:
```javascript
const payload = {
  title: formData.title,
  description: formData.description,
  status: formData.status,
  priority: formData.priority,
  dueDate: formData.dueDate || null,
  // assignedTo is missing here!
};
```
As a result, tasks are always saved as unassigned (`assignedTo: null`).

## Expected Behavior
- When an Admin selects a team member from the "Assignee" dropdown, the selected user's MongoDB ID must be included in the submission payload (`assignedTo: formData.assignedTo || null`).
- Selecting `-- Unassigned --` should set `assignedTo: null`.
- When viewing the task in `/tasks` and `/tasks/:id`, the assigned user's full name should be clearly displayed.
- Normal (non-admin) users must not be able to assign or reassign tasks.

## Acceptance Criteria
- [ ] Selecting a user in Create Task assigns the task to that user in the database.
- [ ] Selecting a user in Edit Task updates the task assignee.
- [ ] Assigned user's name is rendered in the Task table and Task details page.
- [ ] Setting assignee to unassigned clears the assignment.
- [ ] Regular users cannot access the assignment dropdown.

## Relevant Files and Components
- `frontend/src/components/TaskForm.jsx` (line ~55: `handleSubmit` payload construction)
- `frontend/src/pages/CreateTaskPage.jsx`
- `frontend/src/pages/EditTaskPage.jsx`
- `frontend/src/components/TaskTable.jsx`

## Steps to Reproduce
1. Log in as Admin (`admin@taskflow.dev` / `Admin@123456`).
2. Go to `/tasks/create`.
3. Fill in title: `"Test Assignment"`.
4. In the "Assignee" dropdown, select `"John Doe (user@taskflow.dev)"`.
5. Click "Create Task".
6. In the task list, look at "Test Assignment". Notice the Assignee column shows "Unassigned".

## Suggested Test Cases
1. **Assign User:** Create a task assigned to "Sarah Connor" -> task list shows Assignee: "Sarah Connor".
2. **Reassign User:** Edit task and reassign to "Alex Rivera" -> assignee updates to "Alex Rivera".
3. **Unassign:** Edit task and select "-- Unassigned --" -> task becomes unassigned.

## Suggested Labels
`enhancement`
