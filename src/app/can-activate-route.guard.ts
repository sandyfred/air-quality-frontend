import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from "@angular/router"
import { AuthenticationService } from './services/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  private bearertoken: string;
  private isAuthenticated: boolean;
  constructor(private router: Router, private authService: AuthenticationService,private http: HttpClient) {
    this.bearertoken = authService.getBearerToken();
    this.isAuthenticated = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log("AuthGuard#canActivate called");
      
      // this.authService.isUserAuthenticated(this.bearertoken).then(resp => {
      //   console.log(resp);
      //   if (!resp.ok) {
      //     this.router.navigate(['/login']);
      //     return false;  
      //   } 
      // })
      return true;

  }
}
