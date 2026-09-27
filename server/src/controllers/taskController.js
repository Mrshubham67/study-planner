const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { courseName, topicName, duration, priority } = req.body;

    const task = await Task.create({
      courseName,
      topicName,
      duration,
      priority,
      completed: false,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Unable to create task",
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = {};

    if (completed !== undefined) {
      filter.completed = completed === "true";
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch tasks",
    });
  }
};

const completeTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.completed = true;
    const updatedTask = await task.save();

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Unable to complete task",
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  completeTask,
};
