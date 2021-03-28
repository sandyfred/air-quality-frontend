import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private regUrl: string;
  constructor(private httpClient: HttpClient) {
    this.regUrl = 'http://localhost:8080/api/v1/auth/register';
  }

  registerUser(data: any) {
    return this.httpClient.post(this.regUrl, data);
  }
}