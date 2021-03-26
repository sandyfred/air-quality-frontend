import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServerService } from './server.service';
import { ApiService } from './api.service';
import { Aqi } from '../aqi';
import { forkJoin } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class FavouriteService {
  listofAqi: Aqi[] = [];
  requestArray = [];

  constructor(
    private serverService: ServerService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  getFavourites(username) {
    
  }
  
}
