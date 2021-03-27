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
    return this.http.get<Array<Favourite>>(`http://localhost:8081/${username}`);
  }

  deleteFavourite(username:string, city: string) {
    return this.http.delete(`http://localhost:8081/${username}/${city}`);
  }
}
