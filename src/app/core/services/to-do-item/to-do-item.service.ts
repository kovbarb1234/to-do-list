import { Injectable } from '@angular/core';
import { ToDoItemModel } from '../../datamodels/to-do-item.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoItemService {

  constructor() { 
    if(!localStorage.getItem("toDoList")){
      this.addToDoListToStorage();
    }
  }

  updateToDoList(newList: ToDoItemModel[]): void{
    localStorage.setItem("toDoList", JSON.stringify(newList));
  }

  addToDoListToStorage(): void {
    const item1 = new ToDoItemModel();
    item1.task = "Buy bread";
    item1.isDone = true;
    const item2 = new ToDoItemModel();
    item2.task = "Walk the dog";
    item2.isDone = false;
    const item3 = new ToDoItemModel();
    item3.task = "Water the plants";
    item3.isDone = false;
    const items = [item1, item2, item3];
    localStorage.setItem("toDoList", JSON.stringify(items));
  }

  getToDoList(): ToDoItemModel[] {
    const listString = localStorage.getItem("toDoList");
    let list = listString ? JSON.parse(listString) : null;

    if (list && list.length > 0) {
      list = list.map((item: any) => {
        const model = new ToDoItemModel();
        Object.assign(model, item);
        return model;
      });
    }
    return list;
  }
}
