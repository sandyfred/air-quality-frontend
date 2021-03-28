import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { FormControl } from '@angular/forms';
import { RouterService } from '../services/router.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitMessage: string;
  user: User;
  userId = new FormControl();
  userEmail = new FormControl();
  userPassword = new FormControl();
  constructor(private routerService: RouterService, private regService: RegisterService) {
    this.submitMessage = '';
    this.user = new User;
  }

  ngOnInit(): void {
  }

  registerSubmit(){
    this.submitMessage = '';
    this.user.userId = this.userId.value;
    this.user.userEmail=this.userEmail.value;
    this.user.userPassword = this.userPassword.value;

    this.regService.registerUser(this.user).subscribe(
      resp => {
        this.routerService.routeToDashboard();
      }, err => {
        this.submitMessage = err.message;
        if (err.status === 403) {
          this.submitMessage = 'Unauthorized';
        } else {
          this.submitMessage = 'Http failure response for http://localhost:8080/ap1/v1/auth/register: 404 Not Found';
        }
      }
    );
  }
}
