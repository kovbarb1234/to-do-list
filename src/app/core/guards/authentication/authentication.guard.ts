import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      const isLoggedIn = this.authService.isUserAuthenticated;
      if (!isLoggedIn) {
        this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url }});
      }
      return resolve(isLoggedIn);
    });
  }
}
