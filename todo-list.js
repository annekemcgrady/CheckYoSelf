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

    //copied from IdeaBox need to update vars to this project
// deleteFromStorage(targetId) {
//   var parsedItems = JSON.parse(localStorage.getItem('ideaArray'));
//   var itemIndex = parsedItems.findIndex(function(idea) {
//     return idea.id === targetId;
//   })
//   parsedItems.splice(itemIndex, 1);
//   localStorage.setItem('ideaArray', JSON.stringify(parsedItems));
//   };

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



