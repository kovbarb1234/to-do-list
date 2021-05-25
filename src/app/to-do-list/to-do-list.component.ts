
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToDoItemAddEditModalComponent } from '../core/components/to-do-item-add-edit-modal/to-do-item-add-edit-modal.component';
import { ToDoItemModel } from '../core/datamodels/to-do-item.model';
import { AuthenticationService } from '../core/services/authentication/authentication.service';
import { ToDoItemService } from '../core/services/to-do-item/to-do-item.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private searchTerms = new Subject<string>();
  private terms: string;

  modalRef: BsModalRef;
  toDoList = new Array<ToDoItemModel>();
  filteredList = new Array<ToDoItemModel>();
  isShowingAll = false;

  constructor(private route: ActivatedRoute, private toDoItemService: ToDoItemService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      this.toDoList = data.toDoList;
      this.filteredList = this.getNotDoneItems();
    });

    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.filterList();
    });
  }

  openEditModal(item: ToDoItemModel): void {
    if (item && item.task) {
      this.modalRef = this.modalService.show(ToDoItemAddEditModalComponent);
      if (this.modalRef) {
        this.modalRef.content.task = item.task;
        this.modalRef.content.title = "Edit task";
        this.modalRef.content.onClose.subscribe((result: string) => {
          if (result) {
            if (this.filteredList && this.toDoList) {
              const updatedItem = new ToDoItemModel();
              updatedItem.task = result;
              updatedItem.isDone = item.isDone;
              const index = this.toDoList.indexOf(item);
              if (index !== -1) {
                this.toDoList.splice(index, 1);
                this.toDoList.push(updatedItem);
                this.toDoItemService.updateToDoList(this.toDoList);
                this.filterList();
              }
            }
          }
        });
      }
    }
  }

  openAddModal(): void {
    this.modalRef = this.modalService.show(ToDoItemAddEditModalComponent);
    if (this.modalRef) {
      this.modalRef.content.title = "Add task";
      this.modalRef.content.onClose.subscribe((result: string) => {
        if (result) {
          if (this.filteredList && this.toDoList) {
            const newItem = new ToDoItemModel();
            newItem.task = result;
            newItem.isDone = false;
            this.toDoList.push(newItem);
            this.toDoItemService.updateToDoList(this.toDoList);
            this.filterList();
          }
        }
      });
    }

  }

  deleteItem(item: ToDoItemModel): void {
    if (this.filteredList && this.toDoList) {
      const index = this.toDoList.indexOf(item);
      this.toDoList.splice(index, 1);
      this.toDoItemService.updateToDoList(this.toDoList);
      this.filterList();
    }
  }

  search(terms: string): void {
    this.searchTerms.next(terms);
    this.terms = terms ? terms.toUpperCase() : '';
  }

  filterList(): void {
    this.filteredList = !this.isShowingAll ? this.getNotDoneItems() : this.toDoList;
    if (this.terms) {
      this.filteredList = this.filterByTerms(this.filteredList);
    }
  }

  filterByTerms(items: ToDoItemModel[]): ToDoItemModel[] {
    if (items) {
      return items.filter((x: ToDoItemModel) => (x.task && x.task.toUpperCase()
        .indexOf(this.terms) >= 0));
    }
    return items;
  }

  toggleShowAll(): void {
    this.isShowingAll = !this.isShowingAll;
    this.filterList();
  }

  getNotDoneItems(): ToDoItemModel[] {
    return this.toDoList.filter((item: ToDoItemModel) => !item.isDone);
  }

  updateList() {
    if (this.toDoList && this.toDoList.length > 0)
      this.toDoItemService.updateToDoList(this.toDoList);
    this.filterList();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

