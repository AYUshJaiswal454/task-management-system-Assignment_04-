# [Bug] Add client-side task form validation

## Problem Description
When creating or editing a task, user inputs must be validated on the client side before triggering an API request. Currently, client-side validation is absent, leading to unhandled empty submissions and poor user feedback.

## Current Behavior
The task form in `frontend/src/components/TaskForm.jsx` does not perform client-side checks before submitting:
- A user can submit the form with an empty title or whitespace-only title (`"   "`).
- There are no inline validation error messages displayed below individual form fields.
- Submitting an empty title produces a generic server error (HTTP 400) rather than instant inline feedback.
- Description length and due date formats are not validated on the client.

## Expected Behavior
- **Title Validation:** Title is required, cannot be empty, and cannot consist solely of whitespace characters.
- **Description Validation:** Maximum length constraint of 2,000 characters.
- **Due Date Validation:** If provided, must represent a valid date string.
- **Inline Error Feedback:** Red inline helper messages should appear directly beneath the invalid fields.
- **Submission Prevention:** If any client validation rule fails, form submission must be prevented, and no network request should be dispatched.
- **Independent Backend Validation:** Backend validation must remain active as a secondary defense layer.

## Acceptance Criteria
- [ ] Submitting with an empty or whitespace title displays an inline error: `"Task title is required"`.
- [ ] Form with invalid fields blocks the `onSubmit` handler.
- [ ] Inline errors clear once the user corrects the input.
- [ ] Valid forms submit properly and navigate back to `/tasks`.

## Relevant Files and Components
- `frontend/src/components/TaskForm.jsx`
- `frontend/src/pages/CreateTaskPage.jsx`
- `frontend/src/pages/EditTaskPage.jsx`

## Steps to Reproduce
1. Log in as Admin (`admin@taskflow.dev` / `Admin@123456`).
2. Navigate to `/tasks/create`.
3. Leave the "Task Title" input blank (or enter spaces).
4. Click "Create Task".
5. Notice the browser attempts to submit the form without client-side inline validation.

## Suggested Test Cases
1. **Empty Title:** Click submit with empty title -> inline error `"Task title is required"`.
2. **Whitespace Title:** Enter `"   "` -> inline error `"Task title cannot be empty"`.
3. **Valid Form:** Enter `"Deploy staging environment"`, choose due date -> submits successfully.

## Suggested Labels
`bug`, `good first issue`
