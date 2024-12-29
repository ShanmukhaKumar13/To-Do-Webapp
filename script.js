const todoForm = document.querySelector('form');
const todoInput = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = loadTodos();
updateTodoList();

todoForm.addEventListener('submit', function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todoInput.value.trim();
    if(todoText.length > 0){
        const todoObj = {
            text: todoText,
            completed: false
        };
        allTodos.push(todoObj);
        updateTodoList();
        saveTodos();
        todoInput.value = '';
    }
}

function updateTodoList(){
    todoListUL.innerHTML = '';
    allTodos.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoListUL.appendChild(todoItem);
    });
}

function createTodoItem(todo, todoIndex){
    const todoID = "todo-" + todoIndex;
    const todoLI = document.createElement('li');
    const todoText = todo.text;
    todoLI.className = 'todo';
    todoLI.innerHTML = `
                <input type="checkbox" id="${todoID}">
                <label for="${todoID}" class="custom-checkbox">
                    <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </label>
                <label for="${todoID}" class="todo-text">
                    ${todoText}
                </label>
                <button class="delete-button">
                    <svg fill="var(--secondary-color)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
    `

    const deleteButton = todoLI.querySelector('.delete-button');
    deleteButton.addEventListener('click', function(){
        allTodos.splice(todoIndex, 1);
        updateTodoList();
        saveTodos();
    });

    const checkbox = todoLI.querySelector("input");
    checkbox.addEventListener('change', function(){
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return todoLI;
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(allTodos));
}

function loadTodos() {
    const todos = localStorage.getItem('todos') || "[]";
    return JSON.parse(todos);
}


// Typing effect for placeholder
const placeholderText = "Write today's goals...";
let placeholderIndex = 0;

function typePlaceholder() {
    if (placeholderIndex < placeholderText.length) {
        todoInput.placeholder += placeholderText.charAt(placeholderIndex);
        placeholderIndex++;
        setTimeout(typePlaceholder, 100); // Adjust typing speed here
    }
    else {
        // Reset the placeholder and index after a short delay
        setTimeout(() => {
            todoInput.placeholder = "";
            placeholderIndex = 0;
            typePlaceholder();
        }, 2000); // Adjust delay before restarting the typing effect
    }
}

// Start typing effect when the page loads
document.addEventListener('DOMContentLoaded', typePlaceholder);