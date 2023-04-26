var todos = []
var completed = []
var id = 0;

document.getElementById("todoCount").innerText = '0';
document.getElementById("completedCount").innerText = '0';


const createTodo = () => {
    const newTodo = {
        id,
        todo: document.getElementById("todoInput").value
    };
    console.log(newTodo);
    return newTodo;
}

const incrementId = () => {
    id++;
}

const addTask = (event) => {
    event.preventDefault();
    const newTodo = createTodo();
    incrementId();
    addTodo(newTodo);
    document.getElementById('todoInput').value = ''
}

const addTodo = (rtodo) => {
    todos = [rtodo, ...todos];
    // console.log(todos);
    updateTodoCount();
}


const updateTodoCount = () => {
    document.getElementById("todoCount").innerText = todos.length;
    updateTodoHtml();
}

const updateTodoHtml = () => {
    var todohtml = buildTodoHtml();
    document.getElementById("todoList").innerHTML = todohtml;
}


const buildTodoHtml = () => {
    return todos.reduce((accu, element) => accu + `<li class="task-item">
                                                        <label class="checkbox">
                                                            <input type="checkbox" id="${element.id}" onclick="removeTask(${element.id}, ${1})">
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <label for="${element.id}" class="todoText">${element.todo}</label>
                                                        <div>
                                                        <button class="editBtn" onclick="editTodo(${element.id})">Edit</button>
                                                        <button class="delBtn" onclick="deleteTodo(${element.id})">Delete</button>
                                                        </div>
                                                    </li>
                                                    `,
        '');
}


const removeTask = (id, choice) => {
    if (choice === 1) {
        removeFromTodo(id)
    }
    else {
        removeFromCompleted(id);
    }
}

const removeFromTodo = (id) => {
    rtodo = todos.filter((obj) => obj.id === id)[0];
    todos.splice(todos.indexOf(rtodo), 1);
    updateTodoCount();
    addCompleted(rtodo);
}

const removeFromCompleted = (id) => {
    rtodo = completed.filter((obj) => obj.id === id)[0];
    completed.splice(completed.indexOf(rtodo), 1);
    updateCompletedCount();
    addTodo(rtodo);
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
    var completedHtml = buildCompletedHtml();
    document.getElementById("completedList").innerHTML = completedHtml;
}

const buildCompletedHtml = () => {
    return completed.reduce((accu, element) => accu + `<li class="task-item">
                                                        <label class="checkbox">
                                                            <input type="checkbox" id="${element.id}" onclick="removeTask(${element.id}, ${2})" checked>
                                                            <span class="checkmark"></span>
                                                        </label>
                                                        <label for="${element.id}" class="todoText"><s>${element.todo}</s></label>
                                                        <button class="delBtn" onclick="deleteCompleted(${element.id})">Delete</button>
                                                    </li>
                                                    `,
        '');
}

const deleteTodo = (id) => {
    rtodo = todos.filter((obj) => obj.id === id)[0];
    todos.splice(todos.indexOf(rtodo), 1);
    updateTodoCount();
}

const deleteCompleted = (id) => {
    dtodo = completed.filter((obj) => obj.id === id)[0];
    completed.splice(completed.indexOf(dtodo), 1);
    updateCompletedCount();
}


const makeEdit = (event, id) => {
    event.preventDefault();
    let curr = todos.filter((obj)=>obj.id===id)[0];

    curr.todo = document.getElementById("todoInput").value;
    updateTodoCount();
    document.getElementById("todoInput").value="";
    document.getElementById("todoForm").setAttribute("onsubmit", `addTask(event)`);
}

const editTodo = (id) => {
    let curr = todos.filter((obj)=>obj.id===id)[0];
    let input = document.getElementById("todoInput");
    input.value = curr.todo;

    document.getElementById("todoForm").setAttribute("onsubmit", `makeEdit(event, ${id})`);
}