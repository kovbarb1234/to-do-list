import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../core/datamodels/user.model';
import { AuthenticationService } from '../core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model = new UserModel();
  isPending = false;
  isCapsLockActive = false;
  isPasswordFieldFocused = false;
  isPassword = true;

  @ViewChild('loginForm', { static: true }) loginForm!: NgForm;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.getModifierState && e.getModifierState('CapsLock')) {
        this.isCapsLockActive = true;
      }
    });
  }

  login(): void {
    if (this.loginForm) {
      (<any>Object).values(this.loginForm.controls).forEach((control: FormControl) => {
        control.markAsTouched();
      });

      if (this.loginForm.valid && this.model.password && this.model.userName) {
        this.model.userName = this.model.userName.trim();
        if (this.authService.login(this.model.password, this.model.userName)) {
          console.log("ok");
          this.router.navigate(['/']);
        }
        else{
          //show error
        }
      }
    }
  }

  toggleShowPassword() {
    this.isPassword = !this.isPassword;
  }

  setPasswordFieldFocus(val: boolean) {
    this.isPasswordFieldFocused = val;
  }
}
