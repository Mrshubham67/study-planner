import { useState } from "react";
import "./TaskForm.css";

const initialForm = {
  courseName: "",
  topicName: "",
  duration: "",
  priority: "medium",
};

function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};

    if (!formData.courseName || !formData.courseName.trim()) {
      formErrors.courseName = "Course name is required";
    }

    if (!formData.topicName || !formData.topicName.trim()) {
      formErrors.topicName = "Topic name is required";
    }

    const duration = Number(formData.duration);
    if (!formData.duration || Number.isNaN(duration) || duration <= 0) {
      formErrors.duration = "Duration must be greater than 0";
    }

    if (!["low", "medium", "high"].includes(formData.priority)) {
      formErrors.priority = "Priority must be low, medium, or high";
    }

    return formErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit({
        ...formData,
        duration: Number(formData.duration),
      });
      setFormData(initialForm);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="form-card">
      <h2>Add Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="field-group">
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            type="text"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="e.g. Mathematics"
          />
          {errors.courseName && <small>{errors.courseName}</small>}
        </div>

        <div className="field-group">
          <label htmlFor="topicName">Topic Name</label>
          <input
            id="topicName"
            name="topicName"
            type="text"
            value={formData.topicName}
            onChange={handleChange}
            placeholder="e.g. Algebra"
          />
          {errors.topicName && <small>{errors.topicName}</small>}
        </div>

        <div className="form-row">
          <div className="field-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              id="duration"
              name="duration"
              type="number"
              min="1"
              value={formData.duration}
              onChange={handleChange}
              placeholder="60"
            />
            {errors.duration && <small>{errors.duration}</small>}
          </div>

          <div className="field-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <small>{errors.priority}</small>}
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Add Task"}
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
