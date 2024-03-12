//Todo ==> todo list App with vanilla Js

//# select elements...

const form = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todolist");
const filterer = document.querySelector(".filter-todos");

//# Global Vars...
let filterValue = "all";
// let todos = getAllTodos();
const dateOptions = {
  weekday: "short",
  day: "2-digit",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
};

//# Events...

document.addEventListener("DOMContentLoaded", () => {
  const todos = getAllTodos();
  renderTodos(todos);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTodo();
});

filterer.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filterTodos();
});

//# functions...

function addNewTodo() {
  const todos = getAllTodos();
  const newTodo = {
    id: Date.now(),
    title: todoInput.value,
    createdAt: new Date().toISOString(),
    isCompleted: false,
  };
  todos.push(newTodo);
  todoInput.value = "";
  saveAllTodos(todos);
  filterTodos(todos);
}
function renderTodos(todos) {
  let result = "";
  todos.forEach((item) => {
    result += ` <li class="todo">
    <p class="todo__title   ${item.isCompleted && "completed"}">${
      item.title
    }</p>
    <span class="todo__createdAt">${new Date(item.createdAt).toLocaleDateString(
      "fa-IR",
      dateOptions
    )}</span>
    <button class="todo__check" data-id=${
      item.id
    }><i class="far fa-check-square"></i></button>
    <button class="todo__remove" data-id=${
      item.id
    }><i class=" far fa-trash-alt"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;

  //? delete btns
  const deleteBtns = document.querySelectorAll(".todo__remove");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => deleteTodo(e));
  });
  //? check btns
  const checkBtns = document.querySelectorAll(".todo__check");
  checkBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => checkTodos(e));
  });
}
function filterTodos() {
  const allTodos = getAllTodos();
  switch (filterValue) {
    case "all": {
      renderTodos(allTodos);
      break;
    }
    case "completed": {
      const filteredTodos = allTodos.filter((t) => t.isCompleted);
      renderTodos(filteredTodos);
      break;
    }
    case "uncompleted": {
      const filteredTodos = allTodos.filter((t) => !t.isCompleted);
      renderTodos(filteredTodos);
      break;
    }
  }
}
function deleteTodo(e) {
  const todos = getAllTodos();

  deletedId = e.target.dataset.id;
  const filteredTodos = todos.filter((t) => t.id != deletedId);
  saveAllTodos(filteredTodos);
  filterTodos(todos);
}
function checkTodos(e) {
  const todos = getAllTodos();

  const checkId = e.target.dataset.id;
  const selectedTodo = todos.find((t) => t.id == checkId);
  selectedTodo.isCompleted = !selectedTodo.isCompleted;
  saveAllTodos(todos);
  filterTodos(todos);
}

// save and read Data from localStorage
function getAllTodos() {
  const allTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return allTodos;
}
function saveAllTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
