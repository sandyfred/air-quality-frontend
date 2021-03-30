import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private authUrl = 'http://localhost:8080/api/v1/auth/login';
  constructor(private httpClient: HttpClient) {}

  authenticateUser(newUser: any): Observable<any> {
    sessionStorage.setItem('userEmail', newUser.userEmail);
    return this.httpClient.post(this.authUrl, newUser, {
      responseType: 'text',
    });
  }

  // setBearerToken(token: string) {
  //   localStorage.setItem('bearerToken', token);
  // }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  removeToken(): void {
    localStorage.removeItem('bearerToken');
  }

  isUserAuthenticated(token) {
    return this.httpClient
      .get('http://localhost:8082/api/v1/subscriber', {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      })
      .subscribe(
        (response) => console.log(response),
        (err) => console.log(err)
      );

    // fetch("http://localhost:8082/api/v1/subscriber/",{
    //   method: 'GET',
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   },
    //   mode: 'no-cors'
    // }).then(response => console.log(response));
  }

  //.pipe(map(reponse => reponse['isAuthenticated'])).toPromise();
}
