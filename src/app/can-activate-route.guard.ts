import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  private bearertoken: string;
  private isAuthenticated: boolean;
  constructor(private router: Router, private authService: AuthenticationService) {
    this.bearertoken = authService.getBearerToken();
    this.isAuthenticated = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.isUserAuthenticated(this.bearertoken).then(resp => {
        if (!resp) {
          reject(false);
          this.router.navigate(['/login']);
        } else {
          resolve(true);
        }
      });
    });

  }
}
