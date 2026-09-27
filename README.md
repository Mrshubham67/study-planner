# Study Planner MERN

A simple Study Planner web application built with the MERN stack. It helps students keep track of their study tasks, mark them as complete, and filter by task status.

## What the project does

The app lets a student:

- Add a study task
- Enter a course name
- Enter a topic name
- Add a study duration in minutes
- Choose a priority: low, medium, or high
- Mark a task as completed
- View all, pending, or completed tasks

## Technologies used

- React
- Vite
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project structure

```text
study-planner/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── PriorityBadge/
│   │   │   ├── TaskCard/
│   │   │   ├── TaskForm/
│   │   │   └── TaskList/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── .gitignore
├── ARCHITECTURE.md
├── README.md
└── package.json
```

## How to install dependencies

1. Open a terminal in the project root.
2. Install the backend dependencies:

```bash
cd server
npm install
```

3. Install the frontend dependencies:

```bash
cd ../client
npm install
```

## How to configure MongoDB

1. Copy the example environment file:

```bash
cd server
copy .env.example .env
```

2. In the `server/.env` file, add your MongoDB connection string:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/study-planner
```

You can also use a MongoDB Atlas connection string instead of a local database.

## How to start the backend

From the `server` folder:

```bash
npm run dev
```

This starts the Express server.

## How to start the frontend

From the `client` folder:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## API endpoints

### Create a task

```http
POST /api/tasks
```

Request body:

```json
{
  "courseName": "Operating Systems",
  "topicName": "Process Management",
  "duration": 60,
  "priority": "high"
}
```

### Get all tasks

```http
GET /api/tasks
```

### Get pending tasks

```http
GET /api/tasks?completed=false
```

### Get completed tasks

```http
GET /api/tasks?completed=true
```

### Mark task as completed

```http
PATCH /api/tasks/:id/complete
```

## Future improvements

Possible improvements for later versions:

- Edit or delete tasks
- Search and sort tasks
- User login system
- Weekly calendar view
- Notifications or reminders
- Task categories and tags

## Beginner note

This project keeps the logic simple. It uses plain React state and a standard Express REST API so it is easy to follow and learn from.
