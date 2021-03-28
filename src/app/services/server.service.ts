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
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyMjE5NTU5MCwiaWF0IjoxNjE2OTI1MTkwfQ.iOKLTv7fT2fVdl29yA-8c8M-5Irdp05iglwEk_Q1i_Y',
        },
      }
    );
  }

  deleteFavourite(username: string, city: string) {
    return this.http.delete(`http://localhost:8081/api/v1/favourites/${username}/${city}`);
  }
}
