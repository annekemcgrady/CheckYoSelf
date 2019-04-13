var searchInput = document.querySelector('.search-input');
var taskTitleInput = document.querySelector('.task-title');
var navTaskArea = document.querySelector('.nav-task-list');
var taskItemInput = document.querySelector('.task-item');
var taskItemButton = document.querySelector('.add-task-icon-box');
var makeTaskButton = document.querySelector('.make-task-button');
var cardField = document.querySelector('.card-field');
var taskItems = [];
var allTaskCards = [];

makeTaskButton.addEventListener('click', bigBoy);
taskItemButton.addEventListener('click', populateNavList);

function populateNavList(event){
  var taskList = document.createElement('ul');
  navTaskArea.append(taskList);
  taskList.innerHTML =
      `<ul>
      <li><img class="task-item-delete" src="images/delete.svg"> 
      <span class="nav-list-item">${taskItemInput.value}</span></li>
       </ul>`
      makeTaskListObject(taskItemInput.value);
      clearTaskItemInput();
     
};

function clearNavList(){
  var taskList = document.createElement('ul');
  taskList.innerHTML = "";
};

function clearTaskItemInput(){
  taskItemInput.value = "";
};

function makeTaskListObject(text){
 var object = new TaskItems(text)
console.log(object);
taskItems.push(object);
console.log(taskItems);
}

function populateCard(task) {
  var cardPlaceholder = document.createElement("div");
  cardField.prepend(cardPlaceholder);
  cardPlaceholder.innerHTML = 
        `<article class="task-card-container" data-id="XXX" >
        <section class="card-header>
        <h2 contentEditable = "true" class="card-title">"XXX"</h2>
        </section>
        <body> 
        <ul>
        <img>
        <li contentEditable = "true" class="card-item">"XXX"</li>
        </ul>
        </body>
        <section class="card-footer">
          <input class="urgent-icon" type="image" height ="15px" src="images/urgent.svg" alt="mark task urgent button">
          <h6>Urgent</h6>
          <input class="delete-card" type="image" height="15px"src="images/delete.svg" alt="delete card button">
          <h6>Delete</h6>
          </section>
        </article>`
};

function bigBoy(newTask){
  instantiateTask()
  populateCard()
  taskItems = [];
  clearNavList();
  taskTitleInput.value = "";
  }

function instantiateTask () {
  var newTask = new Task(taskItemInput.value, taskItems);
  console.log(newTask)
  allTaskCards.push(newTask);
  newTask.saveToStorage(allTaskCards);
  return newTask;

};