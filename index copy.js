const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
let tasks = [];

function addTask() {
	const taskText = taskInput.value.trim();
	if (taskText === "") {
		window.alert("Inform a task, please!");
		taskInput.focus();
	} else {
		createTask(taskText);
		taskInput.value = "";
		taskInput.focus();
		// console.log(tasks)
	}
}

function createTask(taskText) {
	const task = {
		id: Date.now(),
		text: taskText,
		completed: false,
	};
	tasks.push(task);
	renderTasks();
	saveTasks();
}

function renderTasks() {
	taskList.innerHTML = "";
	tasks.forEach((task) => {
		const li = document.createElement("li");
		const span = document.createElement("span")
		const checkbox = document.createElement("input");
		li.classList.add("taskItens")
		checkbox.type = "checkbox";
		span.textContent = task.text;
		li.prepend(checkbox);
		li.appendChild(span)
		li.appendChild(removeTask(li, task));
		taskList.appendChild(li);
		
		checkbox.checked = task.completed
		if(task.completed == true){
			li.classList.toggle("completed");
		}
		checkbox.addEventListener("change", () => {
			li.classList.toggle("completed");
			task.completed = !task.completed;
			saveTasks();	
		});
	});
}

function saveTasks() {
	localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
	const task = localStorage.getItem("tasks");
	task != null ? (tasks = JSON.parse(task)) : (tasks = []);
	renderTasks();
}

function removeTask(li, task) {
	const btnRemoveTask = document.createElement("button");
	btnRemoveTask.textContent = "x";
	btnRemoveTask.classList.add("removeBtn")
	btnRemoveTask.addEventListener("click", () => {
		li.remove();
		tasks = tasks.filter((item) => item.id !== task.id);
		saveTasks();
	});
	console.log(tasks);
	return btnRemoveTask;
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addTask();
	}
});
clearBtn.addEventListener("click", () => {
	tasks.length = 0;
	taskList.innerHTML = "";
	saveTasks();
});

loadTasks();
