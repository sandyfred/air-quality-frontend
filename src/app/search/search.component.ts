import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  countries: string[] = ['Angola', 'India'];
  selectedCountry?: string;
  states: string[] = [];
  selectedState?: string;
  cities: string[] = [];
  selectedCity?: string;
  aqi: string;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService
      .getCountries()
      .subscribe((response) =>
        response['data'].map((item) => this.countries.push(item.country))
      );
  }

  getStates() {
    this.states = [];
    this.cities = [];
    this.apiService
      .getStates(this.selectedCountry)
      .subscribe((response) =>
        response['data'].map((item) => this.states.push(item.state))
      );
  }

  getCities() {
    this.cities = [];
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
