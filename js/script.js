const mainList = document.getElementById("main_list");

const taskAdder = new TaskAdder;
taskAdder.setup();
mainList.appendChild(taskAdder.taskAdder);

const initSortableMainList = e => {
    const draggingTask = mainList.querySelector(".dragging");
    const undraggingTasks = [...mainList.querySelectorAll(".task:not(.dragging):not(.task-adder)")];

    let nextTask = undraggingTasks.find(task => {
        const rect = task.getBoundingClientRect();
        return e.clientY <= rect.top + task.offsetHeight / 2;
    });

    if (nextTask != undefined)  {
        mainList.insertBefore(draggingTask, nextTask);
    } else {
        mainList.insertBefore(draggingTask, taskAdder.taskAdder);
    }

    let children = mainList.children;
    for (let i = 0; i < children.length - 1; i++) {
        children[i].classList.add("undragging");
    }
}

const initSortableMobileMainList = e => {
    const draggingTask = mainList.querySelector(".dragging");
    const undraggingTasks = [...mainList.querySelectorAll(".task:not(.dragging):not(.task-adder)")];

    let nextTask = undraggingTasks.find(task => {
        const rect = task.getBoundingClientRect();
        return e.touches[0].clientY <= rect.top + task.offsetHeight / 2;
    });

    if (nextTask != undefined) {
        mainList.insertBefore(draggingTask, nextTask);
    } else {
        mainList.insertBefore(draggingTask, taskAdder.taskAdder);
    }
}

mainList.addEventListener("dragover", initSortableMainList);
mainList.addEventListener("touchmove", initSortableMobileMainList);