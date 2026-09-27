import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { getTasks, createTask, completeTask } from "./services/taskApi";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getTasks(filter);
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const handleSubmit = async (taskData) => {
    try {
      setError("");
      const newTask = await createTask(taskData);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
    } catch (err) {
      setError(err.message || "Unable to create task");
      throw err;
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const updatedTask = await completeTask(taskId);
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === taskId ? { ...task, completed: updatedTask.completed } : task
        )
      );
    } catch (err) {
      setError(err.message || "Unable to mark task as complete");
    }
  };

  return (
    <div className="app-shell">
      <Navbar />
      <main className="dashboard">
        <TaskForm onSubmit={handleSubmit} />

        <section className="task-section">
          <div className="filter-row">
            <button
              className={filter === "all" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "pending" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "completed" ? "filter-btn active" : "filter-btn"}
              onClick={() => setFilter("completed")}
            >
              Completed
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          <TaskList
            tasks={tasks}
            loading={loading}
            error={error}
            onComplete={handleComplete}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
