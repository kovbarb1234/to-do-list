import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-to-do-item-add-edit-modal',
  templateUrl: './to-do-item-add-edit-modal.component.html',
  styleUrls: ['./to-do-item-add-edit-modal.component.scss']
})

export class ToDoItemAddEditModalComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();  
  onClose: Subject<string>;
  task: string;
  title: string;
  placeHolder: string;

  @ViewChild('toDoForm', { static: true }) toDoForm!: NgForm;

  constructor(public bsModalRef: BsModalRef) {
    this.onClose = new Subject();
    if (!this.task) {
      this.placeHolder = "Task";
    }
  }

  ngOnInit(): void {
  }

  save(task: string): void {
    this.onClose.next(task);
    this.bsModalRef.hide();
  }

  close(): void {
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
