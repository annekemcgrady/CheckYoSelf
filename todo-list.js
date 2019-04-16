class Task {
  constructor(title, items){
    this.title = title;
    this.items = items;
    this.id = Date.now();
    this.urgent = false;
  }

  saveToStorage() { 
    var stringifiedToDoArray = JSON.stringify(allTaskCards);
    localStorage.setItem('allTaskCards', stringifiedToDoArray);
    };

deleteFromStorage(targetId) {
  var parsedItems = JSON.parse(localStorage.getItem('allTaskCards'));
  var itemIndex = parsedItems.findIndex(function(task) {
    return task.id === targetId;
  })
  parsedItems.splice(itemIndex, 1);
  localStorage.setItem('allTaskCards', JSON.stringify(parsedItems));
  console.log(itemIndex)
  };

  updateTask(targetId) {
    this.done = !this.done;
    if (this.done === false){
      event.target.src = 'images/checkbox.svg';
    } else { 
      event.target.src = 'images/checkbox-active.svg'
    }
    this.saveToStorage();
    };
    
updateToDo(targetId) {
  this.urgent =!this.urgent;
  if (this.urgent === false){
    event.target.src = 'images/urgent.svg';
    event.target.parentNode.classList.add('.nonurgent');
    event.target.parentNode.classList.remove('.urgent')
  } else {
    event.target.src = 'images/urgent-active.svg';
    event.target.parentNode.classList.add('.urgent');
    event.target.parentNode.classList.remove('.nonurgent')
  }
  this.saveToStorage();

}
};

class TaskItems {
  constructor(content){
  this.done = false;
  this.content = content;
  this.id = Date.now();
  }
};



