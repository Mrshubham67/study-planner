# Study Planner — MERN Architecture

## 1. Project Goal

Build a simple Study Planner web application using the MERN stack:

- MongoDB — database
- Express.js — backend API
- React — frontend
- Node.js — backend runtime

The first version should allow a student to:

1. Add a study task
2. Enter course name
3. Enter topic name
4. Enter duration
5. Assign a priority
6. Mark a task as completed
7. View all tasks
8. View pending tasks
9. View completed tasks

Keep the application simple and beginner-friendly. Do not add authentication, notifications, calendars, AI, or other advanced features in Version 1.

---

## 2. High-Level Architecture

```text
┌──────────────────────────────┐
│          React Client        │
│                              │
│  Components / Pages          │
│  Forms / Task List           │
│  API Service                 │
└──────────────┬───────────────┘
               │ HTTP/JSON
               ▼
┌──────────────────────────────┐
│      Node + Express API      │
│                              │
│ Routes                       │
│ Controllers                  │
│ Models                       │
│ Validation                   │
└──────────────┬───────────────┘
               │ Mongoose
               ▼
┌──────────────────────────────┐
│           MongoDB            │
│                              │
│          tasks collection    │
└──────────────────────────────┘
```

### Request flow

```text
User
 ↓
React UI
 ↓
API request
 ↓
Express route
 ↓
Controller
 ↓
Mongoose model
 ↓
MongoDB
 ↓
JSON response
 ↓
React updates UI
```

---

## 3. Recommended Project Structure

Use a monorepo with separate frontend and backend directories.

```text
study-planner/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── PriorityBadge/
│   │   │   │   ├── PriorityBadge.jsx
│   │   │   │   └── PriorityBadge.css
│   │   │   ├── TaskCard/
│   │   │   │   ├── TaskCard.jsx
│   │   │   │   └── TaskCard.css
│   │   │   ├── TaskForm/
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   └── TaskForm.css
│   │   │   └── TaskList/
│   │   │       ├── TaskList.jsx
│   │   │       └── TaskList.css
│   │   │
│   │   ├── services/
│   │   │   └── taskApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── taskController.js
│   │   │
│   │   ├── models/
│   │   │   └── Task.js
│   │   │
│   │   ├── routes/
│   │   │   └── taskRoutes.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── .gitignore
├── README.md
└── ARCHITECTURE.md
```

---

## 4. Task Data Model

A task should contain:

```js
{
  _id: ObjectId,
  courseName: String,
  topicName: String,
  duration: Number,
  priority: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Field rules

| Field | Type | Required | Rule |
|---|---|---:|---|
| courseName | String | Yes | Cannot be empty |
| topicName | String | Yes | Cannot be empty |
| duration | Number | Yes | Must be greater than 0 |
| priority | String | Yes | `low`, `medium`, or `high` |
| completed | Boolean | No | Default `false` |
| createdAt | Date | Automatic | Mongoose timestamp |
| updatedAt | Date | Automatic | Mongoose timestamp |

Use Mongoose timestamps instead of manually managing `createdAt` and `updatedAt`.

---

## 5. API Design

Base URL:

```text
/api/tasks
```

### Create task

```http
POST /api/tasks
```

Request:

```json
{
  "courseName": "Operating Systems",
  "topicName": "Process Management",
  "duration": 60,
  "priority": "high"
}
```

Response should return the created task.

---

### Get all tasks

```http
GET /api/tasks
```

Returns all tasks.

---

### Get pending tasks

```http
GET /api/tasks?completed=false
```

Returns tasks where `completed` is false.

---

### Get completed tasks

```http
GET /api/tasks?completed=true
```

Returns tasks where `completed` is true.

---

### Mark task as completed

```http
PATCH /api/tasks/:id/complete
```

This changes:

```text
completed: false
```

to:

```text
completed: true
```

The endpoint should also safely handle an already-completed task.

---

## 6. Frontend Architecture

### Dashboard

The main page should contain:

```text
┌────────────────────────────────────────┐
│             Study Planner              │
├────────────────────────────────────────┤
│                                        │
│  [ Add Task ]                          │
│                                        │
│  [All] [Pending] [Completed]           │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ Operating Systems                │  │
│  │ Process Management               │  │
│  │ 60 minutes • HIGH                │  │
│  │              [Mark Completed]    │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

### Components

#### `TaskForm`

Responsible for:

- Course name input
- Topic name input
- Duration input
- Priority selector
- Form validation
- Submitting the task

#### `TaskCard`

Displays:

- Course
- Topic
- Duration
- Priority
- Status
- Complete button

#### `TaskList`

Responsible for:

- Rendering task cards
- Empty-state message
- Loading state
- Error state

#### `PriorityBadge`

Displays the task priority consistently.

#### `Navbar`

Simple application title/navigation.

---

## 7. Frontend State

Do not introduce Redux in Version 1.

Use React's built-in:

```js
useState()
useEffect()
```

The Dashboard can maintain:

```js
tasks
loading
error
filter
```

Example:

```text
filter = "all"
filter = "pending"
filter = "completed"
```

The frontend API layer should be kept in:

```text
client/src/services/taskApi.js
```

Use `fetch` or Axios. Prefer `fetch` if keeping dependencies minimal.

---

## 8. Backend Responsibilities

The backend should:

1. Receive HTTP requests
2. Validate incoming data
3. Communicate with MongoDB
4. Return JSON responses
5. Return appropriate HTTP status codes
6. Handle errors consistently

Keep business logic out of the route definitions where possible.

Recommended flow:

```text
Route
 ↓
Controller
 ↓
Model
 ↓
MongoDB
```

---

## 9. Validation

### Course name

Reject:

```text
""
"   "
```

### Topic name

Reject empty/whitespace-only values.

### Duration

Must be a number greater than zero.

Examples:

```text
60       valid
1        valid
0        invalid
-10      invalid
"abc"    invalid
```

### Priority

Only accept:

```text
low
medium
high
```

Normalize input if appropriate.

---

## 10. Edge Cases

The application should handle:

### Empty task list

Show:

```text
No tasks found.
```

### Invalid task ID

Return:

```text
400 Bad Request
```

or another appropriate error response rather than crashing.

### Task not found

Return:

```text
404 Not Found
```

### Invalid form input

Show validation errors next to the relevant fields.

### Server unavailable

Frontend should show a useful message such as:

```text
Unable to connect to the server. Please try again.
```

### Duplicate clicks

Prevent accidental repeated task submissions while the request is processing.

### Already completed task

Do not cause an application error if the user attempts to complete an already-completed task.

---

## 11. Error Response Format

Use a consistent JSON structure:

```json
{
  "success": false,
  "message": "Task not found"
}
```

Successful responses can use:

```json
{
  "success": true,
  "data": {}
}
```

---

## 12. HTTP Status Codes

Use common status codes:

```text
200 OK              Successful GET/PATCH
201 Created         Successful POST
400 Bad Request     Invalid input
404 Not Found       Resource doesn't exist
500 Server Error    Unexpected server error
```

---

## 13. Version 1 Scope

### Must have

- Add task
- Course name
- Topic name
- Duration
- Priority
- Mark completed
- View all
- View pending
- View completed
- Form validation
- Loading states
- Error handling
- MongoDB persistence

### Do not build yet

- Authentication
- User accounts
- Passwords
- Notifications
- Calendar
- AI features
- Pomodoro timer
- Analytics
- Social features
- Redux
- Complex state management
- Microservices
- Deployment automation

These can be added later.

---

## 14. Development Phases

### Phase 1 — Backend foundation

Build:

- Express server
- MongoDB connection
- Task model
- Basic error handling

### Phase 2 — API

Implement:

- POST `/api/tasks`
- GET `/api/tasks`
- PATCH `/api/tasks/:id/complete`

Add filtering through the `completed` query parameter.

### Phase 3 — React UI

Build:

- Dashboard
- Task form
- Task card
- Task list
- Filter buttons

### Phase 4 — Connect frontend and backend

Connect React to the REST API.

Test:

```text
Add task
 ↓
MongoDB
 ↓
Get task
 ↓
Display task
 ↓
Complete task
 ↓
Display completed status
```

### Phase 5 — Validation and polish

Add:

- Form validation
- Loading indicators
- Error messages
- Empty states
- Disabled submit button while saving
- Responsive design

---

## 15. Coding Principles

Because this project is intended for a beginner:

- Prefer simple code over clever code.
- Use descriptive variable names.
- Keep functions small.
- Avoid unnecessary abstractions.
- Avoid Redux initially.
- Avoid TypeScript initially unless specifically requested.
- Explain important code with short comments.
- Keep frontend and backend responsibilities separate.
- Do not introduce a library when a simple built-in solution is sufficient.
- Follow REST conventions.
- Never put MongoDB credentials directly in source code.

---

## 16. Environment Variables

Backend `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Provide `.env.example`:

```env
PORT=5000
MONGODB_URI=
```

Never commit the real `.env` file.

---

## 17. Future Architecture

After Version 1 works, the application can evolve into:

```text
Authentication
      ↓
Users
      ↓
Courses
      ↓
Tasks
      ↓
Study Sessions
      ↓
Progress / Analytics
      ↓
Calendar / Reminders
```

But these should be implemented incrementally rather than included in the first version.
