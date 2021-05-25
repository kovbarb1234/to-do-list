import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  get userName(): string {
    return this.userService.currentUserName;
  }

  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}
