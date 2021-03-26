import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '../location';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  getFavourites(username): Observable<Location[]> {
    return this.http.get<Location[]>(`http://localhost:8081/${username}`);
  }
}
