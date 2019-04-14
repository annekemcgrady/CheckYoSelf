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
  getListItems(taskItems);
  taskItems = [];
  clearTaskItemInput()
  // clearNavList();
  console.log(taskItems)
  };

  //Instantiates a new instance of the big class Task, puts in big array
  function instantiateTask(newTask) {
    var newTask = new Task(taskTitleInput.value, taskItems);
    console.log(newTask)
    allTaskCards.push(newTask);
    newTask.saveToStorage(allTaskCards);
    return newTask;
  };

  //populates the card on the DOM
function populateCard(text) {
  var newCard = 
        `<article data-id=${text.id} class="task-card-container">
        <section class="card-header>
        <h2 contentEditable = "true" class="card-title">${text.title}</h2>
        </section>
        <body class="card-body"> 
        <ul class="card-list" data-id=${text.id}>
        </ul>
        </body>
        <section class="card-footer">
          <input class="urgent-icon" type="image" height ="15px" src="images/urgent.svg" alt="mark task urgent button">
          <h6>Urgent</h6>
          <input class="delete-card" type="image" height="15px"src="images/delete.svg" alt="delete card button">
          <h6>Delete</h6>
          </section>
        </article>`
        cardField.insertAdjacentHTML('afterbegin', newCard);
};

//get the array of objects
//go through the array and append the content of each to the card on the DOM
function getListItems(items){
  console.log(items[0].id)
  var cardListArea = document.querySelector('.card-list')
  taskItems.forEach(function(elem, index) {
  console.log(elem.content)
  })
  // genListItem(elem)
};

// function genListItem(elem){
//   var cardListArea = document.querySelector('.card-list')
//   console.log(elem.content)
  
// }

  // function clearNavList(){
  //   taskList.innerHTML = "";
  // };

