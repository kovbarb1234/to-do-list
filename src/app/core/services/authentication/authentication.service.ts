import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '../../datamodels/user.model';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  get isUserAuthenticated(): boolean {
    const user = localStorage.getItem('currentUser');
    return user !== null;
  }

  constructor(private userService: UserService, private router: Router) { }

  login(password: string, userName: string): boolean {
    const users = this.userService.getUsers();
    if (users && users.length > 0) {
      const user = users.find((x: UserModel) => x.userName === userName
        && x.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['Login']);
  }
}
