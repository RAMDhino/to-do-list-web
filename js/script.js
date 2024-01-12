const checkboxes = document.querySelectorAll("input[type='checkbox']");
const tasks = document.querySelectorAll(".task");
const taskAdder = document.getElementById("task_adder");
const taskAdderLabel = taskAdder.childElementCount[0];
const taskPaper = document.getElementById("task_paper");

checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            checkbox.nextElementSibling.classList.add("stroke-label");
        } else {
            checkbox.nextElementSibling.classList.remove("stroke-label");
        }
    });
});


taskAdder.addEventListener("click", () => {
    taskAdder.children[1].style.display = "none";
    taskPaper.style.display = "inline-block";
    taskPaper.focus();
});

taskPaper.addEventListener("blur", () => {
    taskAdder.children[1].style.display = "inline-block";
    taskPaper.style.display = "none";
});