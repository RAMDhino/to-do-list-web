const mainList = document.getElementById("main_list");
const taskAdder = document.getElementById("task_adder");
const taskPaper = document.getElementById("task_paper");

// Checkbox Prototype
class Checkbox {
    constructor(checkboxId) {
        this.checkboxId = checkboxId;
    }

    checkbox = document.createElement("input");

    makeCheckbox() {
        this.checkbox.setAttribute("type", "checkbox");
        this.checkbox.setAttribute("name", this.checkboxId);
        this.checkbox.setAttribute("id", this.checkboxId);

        this.checkbox.addEventListener("change", () => {
            if (this.checkbox.checked) {
                this.checkbox.nextElementSibling.classList.add("stroke-label");
            } else {
                this.checkbox.nextElementSibling.classList.remove("stroke-label");
            }
        });
    }
}

// Label Maker
let makeNewLabel = (text, checkboxID) => {
    let label = document.createElement("label");
    label.setAttribute("for", checkboxID);
    label.innerHTML = text.trim();
    return label;
}


let checkTotalTasks = () => {
    if (mainList.children.length > 1) {
        taskAdder.children[1].innerHTML = "Adding a Task ...";
    } else {
        taskAdder.children[1].innerHTML = "Click this to add a task!";
    }
}

let IDCounter = 1;

let makeNewTask = taskText => {
    // New Task
    let newTask = document.createElement("div");
    newTask.setAttribute("class", "task");
    mainList.insertBefore(newTask, taskAdder);

    // Checkbox ID
    let checkboxID = `list-item-${IDCounter}`;
    IDCounter++;

    // Checkbox
    let newTask_Checkbox = new Checkbox(checkboxID);
    newTask_Checkbox.makeCheckbox();

    // Label Text
    let newTask_Text = makeNewLabel(taskText, checkboxID);

    // Trash / Delete Icon
    let deleteIcon = document.createElement("div");
    deleteIcon.setAttribute("class", "delete-icon");
    deleteIcon.style.display = "none";

    deleteIcon.addEventListener("click", () => {
        mainList.removeChild(newTask);
        checkTotalTasks();
    });

    
    newTask.appendChild(newTask_Checkbox.checkbox); 
    newTask.appendChild(newTask_Text);
    newTask.appendChild(deleteIcon);

    newTask.addEventListener("mouseout", () => {
        deleteIcon.style.display = "none";
    });

    newTask.addEventListener("mouseover", () => {
        deleteIcon.style.display = "inline-block";
    });
}

taskAdder.addEventListener("click", () => {
    taskAdder.children[1].style.display = "none";
    taskPaper.style.display = "inline-block";
    taskPaper.focus();
});

taskPaper.addEventListener("blur", () => {
    taskAdder.children[1].style.display = "inline-block";
    taskPaper.style.display = "none";

    checkTotalTasks();
});

taskPaper.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        if (taskPaper.value !== "") {
            makeNewTask(taskPaper.value);
            taskPaper.value = "";    
        }
    }
});

taskPaper.addEventListener("touch", (event) => {
    let inputValue = event.target.value;
    if (event.data && event.data.includes("\n")) {
        inputValue = event.target.value.replace(/\n/g, "");
        if (taskPaper.value !== "") {
            makeNewTask(taskPaper.value);
            taskPaper.value = "";    
        }
     }
});