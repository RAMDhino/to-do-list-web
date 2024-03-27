class MainList {
    constructor(container) {
        this.container = container;
        this.taskAdder = document.createElement("div");
        this.taskAdder.setAttribute("id", "task_adder");
        this.taskAdder.setAttribute("class", "task-adder");

        this.taskAdder.addIcon = document.createElement("button");
        this.taskAdder.addIcon.setAttribute("id", "add_icon");
        this.taskAdder.addIcon.setAttribute("class", "add-icon");

        this.taskAdder.label = document.createElement("label");
        this.taskAdder.label.setAttribute("for", "add_icon");
        this.taskAdder.label.innerHTML = "Click this to add a task!";


        this.taskAdder.taskPaper = document.createElement("textarea");
        this.taskAdder.taskPaper.setAttribute("id", "task_paper");
        this.taskAdder.taskPaper.setAttribute("class", "task-paper");
        this.taskAdder.taskPaper.setAttribute("placeholder", "I think I have to ...");

        this.taskAdder.appendChild(this.taskAdder.addIcon);
        this.taskAdder.appendChild(this.taskAdder.label);
        this.taskAdder.appendChild(this.taskAdder.taskPaper);

        this.container.appendChild(this.taskAdder);

        this.tasks = [];
        this.checkboxId = 0;

        this.#addEventListener();
    }

    makeCheckbox(id) {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", id);
        checkbox.setAttribute("id", id);

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                checkbox.nextElementSibling.classList.add("stroke-label");
                return;
            }
            checkbox.nextElementSibling.classList.remove("stroke-label");
        });
        return checkbox;
    }

    makeLabel(text, id) {
        const label = document.createElement("label");
        label.setAttribute("for", id);
        label.innerHTML = text.trim(); 
        return label;
    }

    makeNewTask(labelText, id) {
        let newTask = document.createElement("div");
        newTask.setAttribute("class", "task");
        this.container.insertBefore(newTask, this.taskAdder);

        const checkbox = this.makeCheckbox(id);
        const label = this.makeLabel(labelText, id);

        const removeIcon = document.createElement("div");
        removeIcon.setAttribute("class", "remove-icon");
        removeIcon.style.visibility = "hidden";
        removeIcon.addEventListener("click", () => {
            this.container.removeChild(newTask);
            this.checkTotalTasks();
        });

        newTask.appendChild(checkbox); 
        newTask.appendChild(label);
        newTask.appendChild(removeIcon);

        newTask.addEventListener("mouseout", () => {
            removeIcon.style.visibility = "hidden";
        });

        newTask.addEventListener("mouseover", () => {
            removeIcon.style.visibility = "visible";
        });
        this.tasks.push(label.innerHTML);
    }

    checkTotalTasks() {
        if (this.container.children.length > 1) {
            this.taskAdder.children[1].innerHTML = "Adding a Task ...";
        } else {
            this.taskAdder.children[1].innerHTML = "Click this to add a task!";
        }
    }

    #addEventListener() {
        this.taskAdder.addEventListener("click", () => {
            this.taskAdder.children[1].style.display = "none";
            this.taskAdder.taskPaper.style.display = "inline-block";
            this.taskAdder.taskPaper.focus();
        });
        
        this.taskAdder.taskPaper.addEventListener("blur", () => {
            this.taskAdder.children[1].style.display = "inline-block";
            this.taskAdder.taskPaper.style.display = "none";
            this.checkTotalTasks();
        });
        
        this.taskAdder.taskPaper.addEventListener("keydown", event => {
            if (event.key == "Enter") {
                event.preventDefault();
                if (this.taskAdder.taskPaper.value !== "") {
                    this.makeNewTask(this.taskAdder.taskPaper.value, this.checkboxId);
                    this.taskAdder.taskPaper.value = "";
                    this.checkboxId++;
                }
            }
        });
        
        this.taskAdder.taskPaper.addEventListener("input", event => {
            let inputValue = event.target.value;
            if (event.data && event.data.includes("\n")) {
                inputValue = event.target.value.replace(/\n/g, "");
                if (this.taskAdder.taskPaper.value !== "") {
                    this.makeNewTask(this.taskAdder.taskPaper.value, this.checkboxId);
                    this.taskAdder.taskPaper.value = "";
                    this.checkboxId++;    
                }
             }
        });
    }
}

const mainList = new MainList(document.getElementById("main_list"));