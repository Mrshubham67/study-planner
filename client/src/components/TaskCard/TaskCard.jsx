import PriorityBadge from "../PriorityBadge/PriorityBadge";
import "./TaskCard.css";

function TaskCard({ task, onComplete }) {
  return (
    <article className={`task-card ${task.completed ? "completed" : "pending"}`}>
      <div className="task-header">
        <div>
          <h3>{task.courseName}</h3>
          <p>{task.topicName}</p>
        </div>
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="task-meta">
        <span>{task.duration} minutes</span>
        <span className={task.completed ? "status done" : "status pending"}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      {!task.completed && (
        <button className="complete-btn" onClick={() => onComplete(task._id)}>
          Mark Completed
        </button>
      )}
    </article>
  );
}

export default TaskCard;
