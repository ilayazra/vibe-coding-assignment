const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.addEventListener("click", () => {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

addBtn.addEventListener("click", () => {
    if (input.value !== "") {
        todos.push({ text: input.value, completed: false });
        input.value = "";
        saveTodos();
        renderTodos();
    }
});

renderTodos();

