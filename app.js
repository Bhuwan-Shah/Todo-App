let todoForm = document.querySelector('form');
let todoInput = document.getElementById('todo-input');
let todoListul = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        allTodos.push(todoText);
        updateTodoList();
        saveTodo();
        todoInput.value = "";
    }
}

function updateTodoList() {
    todoListul.innerHTML = "";
    allTodos.forEach((todo, todoIndex) => {
        const todoItem = creatTodoItem(todo, todoIndex);
        todoListul.append(todoItem);
    });
}

function creatTodoItem(todo, todoIndex) {
    const todoLI = document.createElement("li");
    const todoId = "todo-" + todoIndex;
    todoLI.className = "todo";

    todoLI.innerHTML = `
        <input type="checkbox" id="${todoId}">
        <label for="${todoId}" class="custom-checkbox">
            <img src="icone/check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="check btn">
        </label>
        <label class="todo-text" for="${todoId}">
            ${todo}
        </label>
        <button class="delete-button">
            <img src="icone/delete_forever_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="delete btn">
        </button>
    `;

    // Add delete functionality
    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        allTodos.splice(todoIndex, 1); // Remove the item from the array
        saveTodo();                    // Save updated array to localStorage
        updateTodoList();             // Refresh the DOM list
    });

    return todoLI;
}

function saveTodo() {
    const todosJson = JSON.stringify(allTodos);
    localStorage.setItem("todos", todosJson); // fixed key
}

function getTodos() {
    const todos = localStorage.getItem("todos") || "[]"; // fixed key
    return JSON.parse(todos);
}
