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

  

// updateToDo (should update the todo’s title and urgency)
// updateTask (should update a task’s content and if it has been completed)
};

class TaskItems {
  constructor(content){
  this.done = false;
  this.content = content;
  this.id = Date.now();
  }
};



