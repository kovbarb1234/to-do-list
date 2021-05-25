
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { ToDoItemAddEditModalComponent } from './components/to-do-item-add-edit-modal/to-do-item-add-edit-modal.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { ToDoListResolver } from './resolvers/to-do-list/to-do-list.resolver';
import { AuthenticationService } from './services/authentication/authentication.service';
import { ToDoItemService } from './services/to-do-item/to-do-item.service';
import { UserService } from './services/user/user.service';

@NgModule({
  declarations: [
    ToDoItemAddEditModalComponent,
    TopbarComponent
  ],
  imports: [
    FormsModule,
    ModalModule.forRoot(),
    BrowserModule
  ],
  providers: [
    UserService,
    ToDoItemService,
    AuthenticationService,
    ToDoListResolver,
    AuthenticationGuard,
    BsModalRef
  ],
  exports: [
    TopbarComponent
  ],
  entryComponents: [
    ToDoItemAddEditModalComponent
  ]
})
export class CoreModule { }