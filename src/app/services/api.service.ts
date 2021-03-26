import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Aqi} from '../aqi';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  //http://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48

  getCityAqi(country: string,state: string,city: string): Observable<Aqi> {

    const url = `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48`
    return this.http.get<Aqi>(url);
  }


}
