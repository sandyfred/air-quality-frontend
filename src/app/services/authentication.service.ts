import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
  isloggedin: boolean;
  private authUrl = 'http://localhost:8080/api/v1/auth/login';
  constructor(private httpClient: HttpClient, private router: Router) {
    this.isloggedin=false;
  }

  authenticateUser(newUser:any): Observable<any>  {
    sessionStorage.setItem("userEmail", newUser.userEmail);
    this.isloggedin=true;
    return this.httpClient.post(this.authUrl, newUser, {responseType: 'text'});
  }

  // setBearerToken(token: string) {
  //   localStorage.setItem('bearerToken', token);
  // }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeToken():void{
    localStorage.removeItem('bearerToken');
  }

  isUserAuthenticated(token): Promise<any> {
    return fetch('http://localhost:8082/api/v1/subscriber', {
      mode: 'no-cors',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    // return this.httpClient.post("http://localhost:8082/api/v1/subscriber", {}, {
    //   headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // }).subscribe(response => console.log(response))
  }

  //.pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}