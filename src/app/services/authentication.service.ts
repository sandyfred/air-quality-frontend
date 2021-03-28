import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  private authUrl: string;
  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:8080/api/v1/auth/login';
  }

  authenticateUser(data: any) {
    return this.httpClient.post(this.authUrl, data);
  }

  setBearerToken(token: string) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeToken():void{
    localStorage.removeItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<any> {
    return this.httpClient.post(this.authUrl + 'isAuthenticated', {}, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
  }
}