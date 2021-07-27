const d = document;


//Selectors 
const $todoInput = d.querySelector('.todo-input'),
 $todoButton = d.querySelector('.todo-button'),
 $todoList= d.querySelector('.todo-list'),
 $filterOption = d.querySelector('.todo-filter');

//Events Listeners
d.addEventListener("DOMContentLoaded", getToDos);

$todoButton.addEventListener('click', addToDo);

$todoList.addEventListener("click", deleteToDo);

$filterOption.addEventListener('click', filterToDo);

//Agregar
function addToDo(e) {
    e.preventDefault();

    if($todoInput.value.trim() === '' || $todoInput.value.trim() === 0){
        alert("No ingresaste nada");
        $todoInput.value = "";
    } else {
        //Todo Div
        const $todoDiv = d.createElement('div');
        $todoDiv.classList.add("todo");

        //Create Li
        const $newTodo = d.createElement('li');
        $newTodo.innerText = $todoInput.value;
        saveLocalToDos($todoInput.value);
        $newTodo.classList.add('todo-item');
        $todoDiv.appendChild($newTodo);
        //Clear todo input value
        $todoInput.value = "";
    
        //Check Mark Button
        const $completedButton = d.createElement('button');
        $completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        $completedButton.classList.add("complete-btn");
       $todoDiv.appendChild($completedButton);

       //Trash button
        const $trashButton = d.createElement('button');
       $trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
       $trashButton.classList.add("trash-btn");
       $todoDiv.appendChild($trashButton);

        //Apend to list
        $todoList.appendChild($todoDiv);
    }
}

//Eliminar
function deleteToDo(e) {
    const item = e.target;

    if (item.matches(".trash-btn")) {
        const todo = item.parentElement;
        todo.classList.add("fall");

        removeLocalTodos(todo);

        todo.addEventListener("transitionend", e => {
            todo.remove();
        });
    }

    if(item.matches(".complete-btn")){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        console.log(todo);
    }
}

//Filtrar
function filterToDo(e) {
    const todos = $todoList.childNodes;
    todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//Guardar localmente
function saveLocalToDos (todo) {

    //Hay que chequear si tengo alguna tarea
    let todos;
     if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
     todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//Obtener 
function getToDos(){
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
    //Todo Div
    const $todoDiv = d.createElement('div');
    $todoDiv.classList.add("todo");

    //Create Li
    const $newTodo = d.createElement('li');
    $newTodo.innerText = todo;
    $newTodo.classList.add('todo-item');
    $todoDiv.appendChild($newTodo);
    //Clear todo input value
    $todoInput.value = "";
    
    //Check Mark Button
    const $completedButton = d.createElement('button');
    $completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    $completedButton.classList.add("complete-btn");
    $todoDiv.appendChild($completedButton);

    //Trash button
    const $trashButton = d.createElement('button');
    $trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    $trashButton.classList.add("trash-btn");
    $todoDiv.appendChild($trashButton);

    //Apend to list
    $todoList.appendChild($todoDiv);
    });
}

//Remover localmente
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}