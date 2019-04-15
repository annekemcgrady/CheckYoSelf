var searchInput = document.querySelector('.search-input');
var taskTitleInput = document.querySelector('.task-title');
var navTaskArea = document.querySelector('.nav-task-list');
var taskItemInput = document.querySelector('.task-item');
var taskItemButton = document.querySelector('.add-task-icon-box');
var makeTaskButton = document.querySelector('.make-task-button');
var cardField = document.querySelector('.card-field');
var taskItems = [];
var allTaskCards = JSON.parse(localStorage.getItem('allTaskCards'))||[];

makeTaskButton.addEventListener('click', bigBoy);
taskItemButton.addEventListener('click', populateNavList);
window.addEventListener('load', restoreCards);
cardField.addEventListener('click', deleteCard);
navTaskArea.addEventListener('click', deleteNavTaskListItem);

function populateNavList(event){
  var navList =
      `<ul class="card-list">
      <li class="nav-list-item-holder"><input type="image" class="task-item-delete" src="images/delete.svg">
      ${taskItemInput.value}</li>
      </ul>`
      navTaskArea.insertAdjacentHTML('beforebegin',navList)
      makeTaskListObject(taskItemInput.value);
      clearTaskItemInput(); 
};

function deleteNavTaskListItem(e){
  if(e.target.className === "task-item-delete") {
    e.target.closest('.nav-list-item-holder').remove();
    console.log(e.target);
  }
};

function clearTaskItemInput(){
  taskItemInput.value = "";
};

//Makes the little array of list item objects
function makeTaskListObject(text){
var object = new TaskItems(text)
console.log(object);
taskItems.push(object);
console.log(taskItems);
};

//big function to instantiate, populate, clear nav inputs & list
function bigBoy(event){
  var todoList = instantiateTask()
  populateCard(todoList)
  taskItems = [];
  clearTaskItemInput()
  clearNavList();
  console.log(taskItems)
  };

  //clears the nav area todo list upon creation of card
 function clearNavList(){
  areaToClear = document.querySelector(".nav-task-list")
  console.log(areaToClear)
  areaToClear.innerHTML = "";
  taskTitleInput.value = "";
};

  //Instantiates a new instance of the big class Task, puts in big array
  function instantiateTask(newTask) {
    var newTask = new Task(taskTitleInput.value, taskItems);
    console.log(newTask)
    allTaskCards.push(newTask);
    console.log(allTaskCards)
    newTask.saveToStorage(allTaskCards);
    return newTask;
    console.log(allTaskCards)
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
    <input type="image" class="done-icon" src="images/checkbox.svg" data-id=${tasks.items[i].id} id=index ${i}/>
    <p class="card-todo-item">${tasks.items[i].content}</p>
     </li>`
  }
 return gotListItems;
 console.log(gotListItems)
};

function deleteCard(e) {
  if(e.target.className === "delete-card") {
  e.target.closest('.task-card-container').remove();
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