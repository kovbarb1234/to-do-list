import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoItemAddEditModalComponent } from './to-do-item-add-edit-modal.component';

describe('ToDoItemAddEditModalComponent', () => {
  let component: ToDoItemAddEditModalComponent;
  let fixture: ComponentFixture<ToDoItemAddEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToDoItemAddEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoItemAddEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
