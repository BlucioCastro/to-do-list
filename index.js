const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");

function addTask() {
	if (taskInput.value.trim() === "") {
		window.alert("Inform a task, please!");
		taskInput.focus();
	} else {
    createTask()
		taskInput.value = "";
		taskInput.focus();
	}
}

function createTask() {
	const li = document.createElement("li");
	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	li.textContent = taskInput.value;
	li.prepend(checkBox);
	li.appendChild(removeTask(li));
	taskList.appendChild(li);
	checkBox.addEventListener("change", function () {
		li.classList.toggle("completed");
	});
}

function removeTask(li) {
	const btnRemoveTask = document.createElement("button");
	btnRemoveTask.textContent = "x";
  btnRemoveTask.addEventListener("click", () => li.remove());
	return btnRemoveTask
}


addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		addTask();
	}
});
clearBtn.addEventListener("click", () => {
	taskList.innerHTML = "";
});
