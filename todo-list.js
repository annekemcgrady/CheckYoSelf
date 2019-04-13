class Task {
  constructor(title, items){
    this.title = title;
    this.items = items;
    this.id = Date.now();
    this.urgent = false;
  }

saveToStorage(){

}

deleteFromStorage(){

}

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