import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './core/guards/authentication/authentication.guard';
import { ToDoListResolver } from './core/resolvers/to-do-list/to-do-list.resolver';
import { LoginComponent } from './login/login.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/ToDoList', pathMatch: 'full' },
  { path: 'ToDoList', component: ToDoListComponent, canActivate: [AuthenticationGuard], resolve: { toDoList: ToDoListResolver } },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
