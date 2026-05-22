let todoList = [];
let todoInput = document.getElementById('todo-input');
let addTodoBtn = document.getElementById('add-todo-btn');
let todoListElement = document.getElementById('todo-list');

addTodoBtn.addEventListener('click', addTodo);

todoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todoList.push(todoText);
    todoInput.value = '';
    renderTodoList();
  }
}

function renderTodoList() {
  todoListElement.innerHTML = '';
  todoList.forEach((todo, index) => {
    const todoElement = document.createElement('li');
    todoElement.textContent = todo;
    todoListElement.appendChild(todoElement);
  });
}