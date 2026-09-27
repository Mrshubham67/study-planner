import "./PriorityBadge.css";

function PriorityBadge({ priority }) {
  const priorityText = priority?.toUpperCase() || "LOW";

  return <span className={`priority-badge ${priority}`}>{priorityText}</span>;
}

export default PriorityBadge;
