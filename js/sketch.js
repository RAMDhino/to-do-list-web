class Task {
    constructor(labelText, id) {
        this.task = document.createElement("div");
        this.labelText = labelText;
        this.id = id;
    }

    makeCheckbox() {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", this.id);
        checkbox.setAttribute("id", this.id);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                checkbox.nextElementSibling.classList.add("stroke-label");
                return;
            }
            checkbox.nextElementSibling.classList.remove("stroke-label");
        });
        return checkbox;
    }


    makeLabel() {
        const label = document.createElement("label");
        label.setAttribute("for", this.id);
        label.innerHTML = this.labelText.trim(); 
        return label;
    }

    makeTaskDraggable() {
        this.task.draggable = true;

        this.task.addEventListener("dragstart", e => {
            setTimeout(() => this.task.classList.add("dragging"), 0);
        });

        this.task.addEventListener("dragend", () => {
            this.task.classList.remove("dragging");
            let children = mainList.children;
            for (let i = 0; i < children.length - 1; i++) {
                children[i].classList.remove("undragging");
            }
        });

        this.task.addEventListener("touchstart", e => {
            setTimeout(() => this.task.classList.add("dragging"), 0);
        });

        this.task.addEventListener("touchend", () => this.task.classList.remove("dragging"));
    }

    makeNewTask() {
        this.task.setAttribute("class", "task");

        const checkbox = this.makeCheckbox();
        const label = this.makeLabel();

        const removeIcon = document.createElement("div");
        removeIcon.setAttribute("class", "remove-icon");
        removeIcon.style.visibility = "hidden";
        removeIcon.addEventListener("click", () => {
            mainList.removeChild(this.task);
        });

        this.task.appendChild(checkbox); 
        this.task.appendChild(label);
        this.task.appendChild(removeIcon);

        this.task.addEventListener("mouseout", () => {
            removeIcon.style.visibility = "hidden";
        });

        this.task.addEventListener("mouseover", () => {
            removeIcon.style.visibility = "visible";
        });

        this.makeTaskDraggable();
    }
}

class TaskAdder {
    constructor() {
        this.taskAdder = document.createElement("div");
        this.taskPaper = document.createElement("textarea");
        this.checkboxId = 0;
    }

    createAddIcon() {
        const addIcon = document.createElement("button");
        addIcon.setAttribute("id", "add_icon");
        addIcon.setAttribute("class", "add-icon");
        return addIcon;
    }

    createLabel() {
        const label = document.createElement("label");
        label.setAttribute("for", "add_icon");
        label.innerHTML = "Click this to add a task!";
        return label;
    }

    setupTaskPaper() {
        this.taskPaper.setAttribute("id", "task_paper");
        this.taskPaper.setAttribute("class", "task-paper");
        this.taskPaper.setAttribute("placeholder", "I think I have to ...");
    }

    setupTaskAdder() {
        this.taskAdder.setAttribute("id", "task_adder");
        this.taskAdder.setAttribute("class", "task-adder");
        this.taskAdder.appendChild(this.createAddIcon());
        this.taskAdder.appendChild(this.createLabel());
        this.setupTaskPaper();
        this.taskAdder.appendChild(this.taskPaper);
    }

    addEvents() {
        this.taskAdder.addEventListener("click", () => {
            this.taskAdder.children[1].style.display = "none";
            this.taskPaper.style.display = "inline-block";
            this.taskPaper.focus();
        });

        this.taskPaper.addEventListener("keydown", event => {
            if (event.key == "Enter") {
                event.preventDefault();
                if (this.taskPaper.value !== "") {
                    let labelText = this.taskPaper.value;
                    const newTask = new Task(labelText, this.checkboxId);
                    newTask.makeNewTask();
                    mainList.insertBefore(newTask.task, this.taskAdder);
                    this.taskPaper.value = "";
                    this.checkboxId++;
                }
            }
        });
        
        this.taskPaper.addEventListener("input", event => {
            let inputValue = event.target.value;
            if (event.data && event.data.includes("\n")) {
                inputValue = event.target.value.replace(/\n/g, "");
                if (this.taskPaper.value !== "") {
                    let labelText = this.taskPaper.value;
                    const newTask = new Task(labelText, this.checkboxId);
                    newTask.makeNewTask();
                    mainList.insertBefore(newTask.task, this.taskAdder);
                    this.taskPaper.value = "";
                    this.checkboxId++;
                }
             }
        });

        
        this.taskPaper.addEventListener("blur", () => {
            this.taskAdder.children[1].style.display = "inline-block";
            this.taskPaper.style.display = "none";
            this.checkTotalTasks();
        });
    }

    checkTotalTasks() {
        if (mainList.children.length > 1) {
            this.taskAdder.children[1].innerHTML = "Adding a Task ...";
        } else {
            this.taskAdder.children[1].innerHTML = "Click this to add a task!";
        }
    }

    setup() {
        this.setupTaskAdder();
        this.addEvents();
    }
}