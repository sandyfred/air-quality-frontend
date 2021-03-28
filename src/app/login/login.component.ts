import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../User';
import { RouterService } from '../services/router.service'; 
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // const headers = new HttpHeaders()
  //  .set('content-type', 'application/json')
  submitMessage: string;
  user: User;
  userId = new FormControl();
  userPassword = new FormControl();
  constructor(private routerService: RouterService, private authService: AuthenticationService) {
    this.submitMessage = '';
    this.user = new User;
  }

  ngOnInit(): void {
  }

  loginSubmit() {
    this.submitMessage = '';
    this.user.userId = this.userId.value;
    this.user.userPassword = this.userPassword.value;

    this.authService.authenticateUser(this.user).subscribe(
      resp => {
        this.authService.setBearerToken(resp['token']);
        this.routerService.routeToDashboard();
      }, err => {
        this.submitMessage = err.message;
        if (err.status === 403) {
          this.submitMessage = 'Unauthorized';
        } else {
          this.submitMessage = 'Http failure response for http://localhost:8080/ap1/v1/auth/login: 404 Not Found';
        }
      }
    );
  }
  
}