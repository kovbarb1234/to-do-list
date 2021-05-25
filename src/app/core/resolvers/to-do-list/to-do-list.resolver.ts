import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ToDoItemModel } from '../../datamodels/to-do-item.model';
import { ToDoItemService } from '../../services/to-do-item/to-do-item.service';
@Injectable({
  providedIn: 'root'
})
export class ToDoListResolver implements Resolve<ToDoItemModel[]> {
  constructor(private toDoService: ToDoItemService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ToDoItemModel[]> {
    return of(this.toDoService.getToDoList());
  }
}
