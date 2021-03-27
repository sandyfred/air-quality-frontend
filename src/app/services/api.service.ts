import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //http://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48

  getCityAqi(country: string, state: string, city: string): Observable<any> {
    return this.http.get<any>(
      `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48`
    );
  }

  //http://api.airvisual.com/v2/countries?key=46222c20-ed3d-4478-86ca-c13f2896ed48

  getCountries(): Observable<any> {
    return this.http.get<any>(
      'http://api.airvisual.com/v2/countries?key=46222c20-ed3d-4478-86ca-c13f2896ed48'
    );
  }

  getStates(country: string): Observable<any> {
    return this.http.get<any>(
      `http://api.airvisual.com/v2/states?country=${country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48`
    );
  }

  getCities(country: string, state: string): Observable<any> {
    return this.http.get<any>(
      `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48`
    );
  }
}
