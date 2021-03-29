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

  getNearestCity() {
    return this.http.get(
      'http://api.airvisual.com/v2/nearest_city?key=46222c20-ed3d-4478-86ca-c13f2896ed48'
    );
  }
}
