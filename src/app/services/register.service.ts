import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // private regUrl: 'http://localhost:8080/api/v1/auth/register';
  constructor(private httpClient: HttpClient) {
  }

  registerUser(user:any) {
    const url = 'http://localhost:8080/api/v1/auth/register';
    return this.httpClient.post(url, user, {responseType:'text'});
  }
}