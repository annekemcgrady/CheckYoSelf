class Task {
  constructor(title, items){
    this.title = title;
    this.items = items;
    this.id = Date.now();
    // this.urgent = false;
  }

saveToStorage(){

}

deleteFromStorage(){

}
};

class TaskItems {
  constructor(content){
  this.done = false;
  this.content = content;
  }
};