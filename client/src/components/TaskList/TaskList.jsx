import TaskCard from "../TaskCard/TaskCard";
import "./TaskList.css";

function TaskList({ tasks, loading, error, onComplete }) {
  if (loading) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (error) {
    return <p className="empty-state">{error}</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onComplete={onComplete} />
      ))}
    </div>
  );
}

export default TaskList;
