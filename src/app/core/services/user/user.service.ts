import { Injectable } from '@angular/core';
import { UserModel } from '../../datamodels/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  get currentUserName(): string {
    let user = localStorage.getItem('currentUser');
    if (user) {
      user = JSON.parse(user);
      const userModel = new UserModel();
      Object.assign(userModel, user);
      return userModel.userName;
    }
  }

  constructor() {
    if (!localStorage.getItem("users")) {
      this.addUsersToStorage();
    }
  }

  addUsersToStorage(): void {
    const user1 = new UserModel();
    user1.password = "password1";
    user1.userName = "userName1";
    const user2 = new UserModel();
    user2.password = "password2";
    user2.userName = "userName2";
    const users = [user1, user2];
    localStorage.setItem("users", JSON.stringify(users));
  }

  getUsers(): UserModel[] {
    const usersString = localStorage.getItem("users");
    let users = usersString ? JSON.parse(usersString) : null;

    if (users && users.length > 0) {
      users = users.map((user: any) => {
        const model = new UserModel();
        Object.assign(model, user);
        return model;
      });
    }
    return users;
  }
}
