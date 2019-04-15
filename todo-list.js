class Task {
  constructor(title, items, id, urgent){
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
    
// updateToDo (should update the todo’s title and urgency)
};

class TaskItems {
  constructor(content){
  this.done = false;
  this.content = content;
  this.id = Date.now();
  }
};



