const checkboxes = document.querySelectorAll("input[type='checkbox']");
const tasks = document.querySelectorAll(".task");



checkboxes.forEach(checkbox => {
    checkbox.checked = false;
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            checkbox.nextElementSibling.style.color = "gray";
            checkbox.nextElementSibling.style.textDecoration = "line-through";
        } else {
            checkbox.nextElementSibling.style.color = "black";
            checkbox.nextElementSibling.style.textDecoration = "none";
        }
    });
});