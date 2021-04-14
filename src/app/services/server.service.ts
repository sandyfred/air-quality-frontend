import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favourite } from '../favourite';
import { Place } from '../place';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  username: string;
  token: string;
  constructor(private http: HttpClient,private authService: AuthenticationService) {}

  getFavourites(): Observable<Array<Favourite>> {
    this.username = this.authService.getUserEmailToken();
    this.token = this.authService.getBearerToken();
    return this.http.get<Array<Favourite>>(
      `http://localhost:8081/api/v1/favourites/${this.username}`,
      {
        headers: {
          Authorization:
            `Bearer ${this.token}`,
        },
      }
    );
  }

  deleteFavourite(city: string) {
    this.username = this.authService.getUserEmailToken();
    this.token = this.authService.getBearerToken();
    return this.http.delete(`http://localhost:8081/api/v1/favourites/${this.username}/${city}`,
    {
      headers: {
        Authorization:
        `Bearer ${this.token}`
      },
    });
  }
// use this token for emergency
// eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE2MTcxODY0MjcsImlhdCI6MTYxNzAxMzYyN30.hkGFUd3gELnP7tpr3GPVj7pPxE_-6bxkUvY0ufUQ8R8
  addFavourite(location: Place) {
    this.username = this.authService.getUserEmailToken();
    // this.token = this.authService.getBearerToken();
    this.token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJzYW5keWZyZWRAZ21haWwuY29tIiwic3ViIjoiU2FuZHlmcmVkMSIsImlhdCI6MTYxNzExNDUwMn0.GYmhXFzjEr_ZW4yn4m9z0hnQ14L9W9sq9pwGHDEy_Ck"
    this.http.post(`http://localhost:8081/api/v1/favourites/${this.username}`,
    location,
    {
      headers: {
        Authorization:
        `Bearer ${this.token}`
      }
    }).subscribe(res => {
      console.log(res);
    });
  }
}
