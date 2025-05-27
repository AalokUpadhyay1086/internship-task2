const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


window.onload = () => {
  tasks.forEach(renderTask);
};

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const task = { text: taskText, completed: false };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task);
    taskInput.value = "";
  }
});

function renderTask(task) {
  const li = document.createElement("li");
  if (task.completed) li.classList.add("completed");
  li.textContent = task.text;

  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "delete";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    taskList.removeChild(li);
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}
