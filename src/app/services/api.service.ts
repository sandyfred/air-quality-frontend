import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Favourite } from '../favourite';
import { Pollutants } from '../pollutants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  poll: Pollutants = new Pollutants('', '', '', '', '', '');
  fav: Favourite = new Favourite(0, '', '', '', this.poll);

  constructor(private http: HttpClient) {}

  //http://api.airvisual.com/v2/city?city={city}&state={state}&country={country}&key=46222c20-ed3d-4478-86ca-c13f2896ed48

  getCityAqi(country: string, state: string, city: string) {
    return this.http.get(
      `http://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=f27fc2fb-8a2a-4d69-88a4-ba3e8201c64c`
    );
  }

  //http://api.airvisual.com/v2/countries?key=46222c20-ed3d-4478-86ca-c13f2896ed48

  getCountries(): Observable<any> {
    return this.http.get<any>(
      'http://api.airvisual.com/v2/countries?key=f27fc2fb-8a2a-4d69-88a4-ba3e8201c64c'
    );
  }

  getStates(country: string): Observable<any> {
    return this.http.get<any>(
      `http://api.airvisual.com/v2/states?country=${country}&key=f27fc2fb-8a2a-4d69-88a4-ba3e8201c64c`
    );
  }

  getCities(country: string, state: string): Observable<any> {
    return this.http.get<any>(
      `http://api.airvisual.com/v2/cities?state=${state}&country=${country}&key=f27fc2fb-8a2a-4d69-88a4-ba3e8201c64c`
    );
  }

  getNearestCity() {
    return this.http.get(
      'http://api.airvisual.com/v2/nearest_city?key=f27fc2fb-8a2a-4d69-88a4-ba3e8201c64c'
    );
  }
}
