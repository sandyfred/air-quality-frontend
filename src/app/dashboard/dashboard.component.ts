import { Component, OnInit } from '@angular/core';
import { Favourite } from '../favourite';
import { ApiService } from '../services/api.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isFavouriteExists: boolean = false;
  favs: Favourite[] = [];
  countries: string[] = ['Angola', 'India'];
  selectedCountry?: string;
  states: string[] = [];
  selectedState?: string;
  cities: string[] = [];
  selectedCity?: string;
  aqi: string;

  constructor(
    private serverService: ServerService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.serverService.getFavourites('sandyfred@gmail.com').subscribe(
      (favs) => {
        this.favs = favs;
        this.isFavouriteExists = true;
      },
      (err) => (this.isFavouriteExists = false)
    );

    // this.apiService
    //   .getCountries()
    //   .subscribe((response) =>
    //     response['data'].map((item) => this.countries.push(item.country))
    //   );
  }

  removeFromFavourites(fav: Favourite) {
    this.favs.splice(this.favs.indexOf(fav), 1);
    this.serverService
      .deleteFavourite('sandyfred@gmail.com', fav.city)
      .subscribe((data) => console.log(data));
  }

  getStates() {
    this.apiService
      .getStates(this.selectedCountry)
      .subscribe((response) =>
        response['data'].map((item) => this.states.push(item.state))
      );
  }

  getCities() {
    console.log(this.selectedCountry, this.selectedState);
    this.apiService
      .getCities(this.selectedCountry, this.selectedState)
      .subscribe((response) =>
        response['data'].map((item) => this.cities.push(item.city))
      );
  }

  getCityAqi() {
    this.apiService
      .getCityAqi(this.selectedCountry, this.selectedState, this.selectedCity)
      .subscribe((response) => this.aqi = response['data'].current.pollution.aqius);
  }
}
