const express = require("express");
const { createTask, getTasks, completeTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id/complete", completeTask);

module.exports = router;
