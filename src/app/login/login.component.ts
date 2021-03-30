import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../User';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // const headers = new HttpHeaders()
  //  .set('content-type', 'application/json')
  formGroup: FormGroup;
  submitMessage: string;
  user: User;
  userEmail = new FormControl();
  userPassword = new FormControl();
  constructor(private router:Router, private authService: AuthenticationService,private formBuilder: FormBuilder) {
    this.submitMessage = '';
    this.user = new User;
  }
  
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'userEmail': [null],
      'userPassword': [null]
    });
  }

  loginSubmit() {
    this.submitMessage = '';
    this.user.userEmail = this.formGroup.get('userEmail').value;
    this.user.userPassword = this.formGroup.get('userPassword').value;
    
    this.authService.authenticateUser(this.user).subscribe(data=>{
      if(data){
        console.log(data)
        localStorage.setItem('bearerToken', data);
        localStorage.setItem("userEmail",this.formGroup.get('userEmail').value)
        alert("Logged in!")
        this.router.navigate(["/dashboard"]);

      } 
      }, err => {
        this.submitMessage = err.message;
      }
    );
  }
  //on logout clear the localstorage
  
}