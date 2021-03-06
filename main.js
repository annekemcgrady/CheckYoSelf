//query selectors
var greetingDOM = document.querySelector('.greeting');
var searchInput = document.querySelector('.search-input');
var form = document.querySelector('.nav-form');
var navTaskArea = document.querySelector('.nav-task-list')
var taskTitleInput = document.querySelector('.task-title');
var taskItemInput = document.querySelector('.task-item');
var taskItemButton = document.querySelector('.plus-icon');
var makeTaskButton = document.querySelector('.make-task-button');
var clearAllButton = document.querySelector('.clear-all-button')
var cardField = document.querySelector('.card-field');
var taskItems = [];
var allTaskCards = JSON.parse(localStorage.getItem('allTaskCards'))||[];

//event listeners
makeTaskButton.addEventListener('click', bigBoy);
makeTaskButton.addEventListener('click', greeting)
taskItemButton.addEventListener('click', littleBoy);
window.addEventListener('load', restoreCards);
window.addEventListener('load', disableButtons);
window.addEventListener('load', enableButtons);
window.addEventListener('load', greeting);
taskTitleInput.addEventListener('keyup', disableButtons)
taskTitleInput.addEventListener('keyup', enableButtons)
taskItemInput.addEventListener('keyup', disableButtons)
taskItemInput.addEventListener('keyup', enableButtons)
cardField.addEventListener('click', deleteCard);
cardField.addEventListener('click', greeting)
cardField.addEventListener('click', updateUrgent)
navTaskArea.addEventListener('click', deleteNavItem);
clearAllButton.addEventListener('click', clearAll);
form.addEventListener('click', function(e) {
  e.preventDefault();
  deleteNavItem(e);
})

//functions
function greeting(event){
  var elements = cardField.querySelectorAll('.task-card-container')
  if(!elements.length){
  greetingDOM.removeAttribute('hidden', true)
  } else if(elements.length) {
    greetingDOM.setAttribute('hidden', true)
  }
};

function disableButtons(e) {
  if(taskTitleInput.value ==="" && taskItemInput.value === ""){
  makeTaskButton.disabled = true;
  makeTaskButton.classList.add('disabled');
  taskItemButton.disabled = true;
  taskItemButton.classList.add('disabled');
  clearAllButton.disabled = true;
  clearAllButton.classList.add('disabled');
  }
};

function enableButtons(e){
  if(taskTitleInput.value !=="" && taskItemInput.value !== ""){
    makeTaskButton.disabled = false;
    makeTaskButton.classList.remove('disabled');
    taskItemButton.disabled = false;
    taskItemButton.classList.remove('disabled');
    clearAllButton.disabled = false;
    clearAllButton.classList.remove('disabled');
  }
};

function littleBoy(event){
event.preventDefault();
var object = makeTaskListObject()
populateNavList(object)
taskItems.push(object)
clearTaskItemInput(); 
disableButtons();
enableButtons();
};

function makeTaskListObject(){
  var object = new TaskItems(taskItemInput.value)
  return object;
  };

function populateNavList(info) {
  var navList =
      `<ul class="nav-list">
      <li class="nav-list-item-holder"><input type="image" data-id="${info.id}" class="task-item-delete" src="images/delete.svg" height="15px">
      ${info.content}</li>
      </ul>`
      navTaskArea.insertAdjacentHTML('beforebegin', navList)
      clearTaskItemInput(); 
      disableButtons();
      enableButtons();
};

function deleteNavItem(e){
  e.preventDefault();
  if (e.target.className ==='task-item-delete'){
    e.target.closest('li').remove();
  } 
};

function clearTaskItemInput(){
  taskItemInput.value = "";
};
function clearTitleInput(){
  taskTitleInput.value="";
};

function clearNavList(e){
  var areaToClear = document.querySelectorAll('.nav-list');
  areaToClear.forEach(function(element){
    element.innerHTML = "";
  })
  navTaskArea.innerHTML = "";
  clearTitleInput();
  clearTaskItemInput()
};

function clearAll(e){
  e.preventDefault();
  clearTaskItemInput();
  clearTitleInput();
  taskItems = [];
  disableButtons();
  enableButtons();
  clearNavList();
};

function bigBoy(event){
  var todoList = instantiateTask()
  populateCard(todoList)
  clearTaskItemInput();
  clearTitleInput();
  disableButtons(event);
  enableButtons(event);
  clearNavList(event);
  taskItems = [];
  };

  function instantiateTask() {
    var newTask = new Task(taskTitleInput.value, taskItems);
    allTaskCards.push(newTask);
    newTask.saveToStorage(allTaskCards);
    return newTask;
  };

function populateCard(text) {
  var newCard = 
        `<article data-id=${text.id} class="task-card-container">
        <section class="card-header">
        <h2 class="card-title">${text.title}</h2>
        </section>
        <body class="card-body"> 
        <ul class="card-list" data-id=${text.id}>
        ${findListItems(text)}
        </ul>
        </body>
        <section class="card-footer">
        <div class="urgent-container">
          <input class="urgent-icon" type="image" height ="20px" src="images/urgent.svg" alt="mark task urgent button">
          <h6>URGENT</h6>
        </div>
        <div class="delete-container">
          <input class="delete-card" type="image" height="20px"src="images/delete.svg" alt="delete card button">
          <h6>DELETE</h6>
        </div>
        </section>
        </article>`
        cardField.insertAdjacentHTML('afterbegin', newCard);
};

function findListItems(tasks){
  var gotListItems ='';
  for(var i = 0; i < tasks.items.length; i++) {
    gotListItems +=
    `<li class="list-item">
    <input type="checkbox" class="done-icon" data-id=${tasks.items[i].id} id=index${i}>
    <label for="id=index${i}" class="card-todo-item">${tasks.items[i].content}</label>
    </li>`
  }
 return gotListItems;
};

function deleteCard(e) {
  if(e.target.className === "delete-card") {
  e.target.closest('.task-card-container').remove();
  var removedTask = new Task();
  var targetId = parseInt(e.target.closest('.task-card-container').dataset.id);
  removedTask.deleteFromStorage(targetId); 
  greeting(e);
  }
};

function restoreCards(e) {
  allTaskCards = allTaskCards.map(function(oldTodo) {
    var restoredCards = new Task(oldTodo.title, oldTodo.items, oldTodo.id, oldTodo.urgent);
    populateCard(restoredCards);
    return restoredCards;
  })
};

function updateUrgent(event) {
    event.preventDefault();
    if (event.target.matches('.urgent-icon')){
    var targetParent = event.target.closest('.task-card-container');
    var parsedId = parseInt(targetParent.dataset.id)
    var targetId = allTaskCards.find(function(idea) {
    return idea.id === parsedId;
    })
    targetId.updateToDo(targetId);
    } 
  };

