//query selectors
var greetingDOM = document.querySelector('.greeting');
var searchInput = document.querySelector('.search-input');
var navTaskArea = document.querySelector('.nav-task-list');
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
taskItemButton.addEventListener('click', populateNavList);
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
navTaskArea.addEventListener('click', deleteNavItem);
clearAllButton.addEventListener('click', clearAll);

//functions

function greeting(event){
  if(!allTaskCards.length){
  greetingDOM.removeAttribute('hidden', true)
  console.log('show greeting')
  } else if(allTaskCards.length) {
    greetingDOM.setAttribute('hidden', true)
    console.log('hide greeting')
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

function populateNavList(event) {
  event.preventDefault();
  var navList =
      `<ul class="nav-list">
      <li class="nav-list-item-holder"><input type="image" class="task-item-delete" src="images/delete.svg" height="15px">
      ${taskItemInput.value}</li>
      </ul>`
      navTaskArea.insertAdjacentHTML('beforebegin', navList)
      makeTaskListObject(taskItemInput.value);
      clearTaskItemInput(); 
      disableButtons();
      enableButtons();
};
//remove individual items from nav task list
function deleteNavItem(e){
  e.preventDefault();
  console.log('before')
  if (e.target.className ==='task-item-delete'){
    e.target.closest('li').remove();
    console.log("after")
  } 
};

function clearTaskItemInput(){
  taskItemInput.value = "";
};
function clearTitleInput(){
  taskTitleInput.value="";
};

//clears the nav area todo list upon creation of card
function clearNavList(e){
  console.log('RUNNING CLEAR NAV')
  var navListToClear = document.querySelector('.nav-list');
  navListToClear.innerHTML ="";
  clearTitleInput();
};

function clearAll(e){
  e.preventDefault();
  console.log('CLEAR ALL FIRING');
  clearTaskItemInput();
  clearTitleInput();
  taskItems = [];
  disableButtons();
  enableButtons();
  clearNavList();
}

//Makes the little array of list item objects
function makeTaskListObject(text){
var object = new TaskItems(text)
taskItems.push(object);
};

//big function to instantiate, populate, clear nav inputs & list
function bigBoy(event){
  var todoList = instantiateTask()
  populateCard(todoList)
  taskItems = [];
  clearTaskItemInput();
  clearTitleInput();
  clearNavList(event);
  console.log(taskItems);
  disableButtons(event);
  enableButtons(event);
  };

  //Instantiates a new instance of the big class Task, puts in big array
  function instantiateTask(newTask) {
    var newTask = new Task(taskTitleInput.value, taskItems);
    allTaskCards.push(newTask);
    console.log(allTaskCards)
    newTask.saveToStorage(allTaskCards);
    return newTask;
  };

  //populates the card on the DOM
function populateCard(text) {
  var newCard = 
        `<article data-id=${text.id} class="task-card-container">
        <section class="card-header">
        <h2 class="card-title">${text.title}</h2>
        </section>
        <hr class="card-line"></hr>
        <body class="card-body"> 
        <ul class="card-list" data-id=${text.id}>
        ${findListItems(text)}
        </ul>
        </body>
        <hr class="card-line"></hr>
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

//go through the array of Tasks and append the content of property "items" of each to the card on the DOM
function findListItems(tasks){
  var gotListItems ='';
  for(var i= 0; i < tasks.items.length; i++) {
    gotListItems +=
    `<li class="list-item>
    <input type="checkbox" class="done-icon" data-id=${tasks.items[i].id} id=index${i}>
    <label for="id=index${i}" class="card-todo-item">${tasks.items[i].content}</label>
    </li>`
  }
 return gotListItems;
};

function deleteCard(e) {
  if(e.target.className === "delete-card") {
  e.target.closest('.task-card-container').remove();
  greeting(e);
  var removedTask = new Task();
  var targetId = parseInt(e.target.closest('.task-card-container').dataset.id);
  removedTask.deleteFromStorage(targetId);
}

};

function restoreCards() {
  allTaskCards = allTaskCards.map(function(oldTodo) {
    var restoredCards = new Task(oldTodo.title, oldTodo.items, oldTodo.id, oldTodo.urgent);
    populateCard(restoredCards);
    return restoredCards;
  })
};

// function updateDone(idea) {
//   event.preventDefault();
//   if (event.target.matches('.done-icon')){
//   var targetParent = event.target.closest('.list-item');
//   var parsedId = parseInt(targetParent.dataset.id)
//   var targetId = allTaskCards.find(function(idea) {
//   return idea.id === parsedId;
//   })
  
//   targetId.doneToggle();
//   restoreCards();
//  } 
// };