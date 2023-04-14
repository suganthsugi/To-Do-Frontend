var todos = []
var completed = []
var id=0;

document.getElementById("todoCount").innerText = '0';
document.getElementById("completedCount").innerText = '0';

const addTask = (event) => {
    event.preventDefault();
    const newTodo = {
        id,
        todo: document.getElementById("todoInput").value
    };
    // console.log(newTodo);
    id++;
    addTodo(newTodo);
    document.getElementById('todoInput').value = ''
}

const addTodo = (rtodo) => {
    todos=[rtodo, ...todos];
    // console.log(todos);

    updateTodoCount();
}


const updateTodoCount = () => {
    document.getElementById("todoCount").innerText = todos.length;
    updateTodoHtml();
}

const updateTodoHtml = () => {
    var todohtml='';
    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];
        if(element!==undefined){
            todohtml+=`<li>
                            <label class="checkbox">
                                <input type="checkbox" id="${element.id}" onclick="removeTask(${element.id}, ${1})">
                                <span class="checkmark"></span>
                            </label>
                            <label class="todoText" for="${element.id}">${element.todo}</label>
                        </li>
                        `
        }
    }
    document.getElementById("todoList").innerHTML = todohtml;
}

const removeTask = (id, choice) => {
    if (choice === 1) {
        rtodo = todos.filter((obj) => obj.id === id)[0];
        todos.splice(todos.indexOf(rtodo), 1);
        updateTodoCount();
        addCompleted(rtodo);
    } 
    else {
        rtodo = completed.filter((obj) => obj.id === id)[0];
        completed.splice(completed.indexOf(rtodo), 1);
        updateCompletedCount();
        addTodo(rtodo);
    }
}


const addCompleted = (rtodo) => {
    completed = [...completed, rtodo];
    // console.log('completed', completed);
    updateCompletedCount();
}


const updateCompletedCount = () => {
    document.getElementById("completedCount").innerText = completed.length;
    updateCompletedHtml();
}


const updateCompletedHtml = () => {
    var completedHtml = '';
    for (let i = 0; i < completed.length; i++) {
        const element = completed[i];
        // console.log(element);
        if(element!==undefined){
            completedHtml+=`<li>
                                <label class="checkbox">
                                    <input type="checkbox" id="${element.id}" onclick="removeTask(${element.id}, ${2})" checked>
                                    <span class="checkmark"></span>
                                </label>
                                <label for="${element.id}" class="todoText"><s>${element.todo}</s></spen>
                            </li>
                        `
        }
    }
    // console.log(completedHtml);
    document.getElementById("completedList").innerHTML = completedHtml;
}