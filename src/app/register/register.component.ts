import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  submitMessage: string;
  user: User;
  userEmail = new FormControl();
  userPassword = new FormControl();
  //, private formBuilder: FormBuilder
  constructor(public router: Router, private regService: RegisterService, private formBuilder: FormBuilder) {
    this.submitMessage = '';
    this.user = new User;
  }

  ngOnInit() {
    this.createForm();
    // this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'userEmail': [null, [Validators.required, Validators.pattern(emailregex)]],
      'userPassword': [null, [Validators.required, this.checkPassword]],
      'validate': ''
    });
  }


  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }


  getErrorEmail() {
    return this.formGroup.get('userEmail').hasError('required') ? 'Field is required' :
      this.formGroup.get('userEmail').hasError('pattern') ? 'Not a valid emailaddress' :
        this.formGroup.get('userEmail').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('userPassword').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.formGroup.get('userPassword').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }



  registerSubmit(){
    // this.submitMessage = '';
    this.user.userId = Math.random()*10;
    localStorage.setItem('USER_ID', this.user.userId);
    console.log(localStorage.getItem('USER_ID'));

    // this.user.userEmail=this.userEmail.value;
    // this.user.userPassword = this.userPassword.value;
    this.user.userEmail = this.formGroup.get('userEmail').value;
    this.user.userPassword = this.formGroup.get('userPassword').value;
    console.log(this.formGroup.get('userEmail').value)
    this.regService.registerUser(this.user).subscribe(data=>{
      console.log("data"+data);
      this.router.navigate(["../login"]);
    }, err => {
      this.submitMessage = err.message;
    }
  );
  }

}
