const API_URL = "http://localhost:5000/api/tasks";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data;
}

export async function getTasks(filter = "all") {
  const query = filter === "all" ? "" : `?completed=${filter === "completed"}`;
  const response = await fetch(`${API_URL}${query}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch tasks");
  }

  return data.data;
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create task");
  }

  return data.data;
}

export async function completeTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}/complete`, {
    method: "PATCH",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to complete task");
  }

  return data.data;
}
