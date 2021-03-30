import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Favourite } from '../favourite';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}

  getFavourites(username: string): Observable<Array<Favourite>> {
    return this.http.get<Array<Favourite>>(
      `http://localhost:8081/api/v1/favourites/${username}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE2MTcxODY0MjcsImlhdCI6MTYxNzAxMzYyN30.hkGFUd3gELnP7tpr3GPVj7pPxE_-6bxkUvY0ufUQ8R8',
        },
      }
    );
  }

  deleteFavourite(username: string, city: string) {
    return this.http.delete(`http://localhost:8081/api/v1/favourites/${username}/${city}`);
  }
}
