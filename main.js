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
    console.log(allTaskCards)
    newTask.saveToStorage(allTaskCards);
    return newTask;
    console.log(allTaskCards)
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
        ${findListItems(text)}
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

//go through the array of Tasks and append the content of property "items" of each to the card on the DOM
function findListItems(tasks){
  var gotListItems ='';
  for(var i= 0; i < tasks.items.length; i++) {
    gotListItems +=
    `<li class="list-item>
    <input type="image" class="done-icon" src="images/checkbox.svg" data-id=${tasks.items[i].id} id="index ${i}"/>
    <p class="card-todo-item">${tasks.items[i].content}</p>
     </li>`
  }
 return gotListItems;
 console.log(gotListItems)
};



