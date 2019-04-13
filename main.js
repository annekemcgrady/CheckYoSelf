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
// cardField.addEventListener('click')

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

function clearTaskItemInput(){
  taskItemInput.value = "";
};

function makeTaskListObject(text){
var object = new TaskItems(text)
console.log(object);
taskItems.push(object);
console.log(taskItems);
};

function bigBoy(newTask){
  instantiateTask()
  // getListItems();
  populateCard(newTask)
  taskItems = [];
  clearNavList();
  taskTitleInput.value = "";
  };

  function instantiateTask() {
    var newTask = new Task(taskTitleInput.value, taskItems);
    console.log(newTask)
    allTaskCards.push(newTask);
    newTask.saveToStorage(allTaskCards);
    return newTask;
  };

  // function getListItems(){
  //     var cardListArea = document.querySelector('.card-list')
  //     taskItems.forEach(function(elem) {
  //     var cardList = document.createElement("li");
  //     cardListArea.append(cardList);
  //     // cardList.innerHTML${elem}
  //     }
  // };

function populateCard(newTask) {
  var cardPlaceholder = document.createElement("div");
  cardField.prepend(cardPlaceholder);
  cardPlaceholder.innerHTML = 
        `<article data-id = ${newTask.id} class="task-card-container" >
        <section class="card-header>
        <h2 contentEditable = "true" class="card-title">${newTask.title}</h2>
        </section>
        <body "card-body"> 
        <ul class="card-list">
        <img>
        <li class="card-item">XXX</li>
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

  function clearNavList(){
    var taskList = document.createElement('ul');
    taskList.innerHTML = "";
  };

