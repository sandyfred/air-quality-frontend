import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  countries: string[] = ['Angola', 'India'];
  selectedCountry?: string;
  states: string[] = [];
  selectedState?: string;
  cities: string[] = [];
  selectedCity?: string;

  aqi: number;
  city: string;
  dataSource: any;
  weather: any;

  constructor(private apiService: ApiService,
    private http: HttpClient) {}

  ngOnInit(): void {
    this.apiService
      .getCountries()
      .subscribe((response) =>
        response['data'].map((item) => this.countries.push(item.country))
      );
      this.getNearestCityAqi();
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
    this.apiService.getCityAqi(
      this.selectedCountry,
      this.selectedState,
      this.selectedCity
    ).subscribe((response) => {
      this.aqi = response['data'].current.pollution.aqius;
      this.city = response['data'].city;
      this.weather = response['data'].current.weather;
      this.http
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response['data'].location.coordinates[1]}&lon=${response['data'].location.coordinates[0]}&appid=bb08115ee62ead9f1188cc5419645a27`
        )
        .subscribe((res) => {
          this.dataSource = Object.keys(res['list'][0].components).map(
            (key) => ({
              name: key,
              value: res['list'][0].components[key],
            })
          );
          console.log(this.dataSource);
        });
      console.log(this.aqi);
      console.log(this.city);
    });
  }


  getNearestCityAqi() {
    this.apiService.getNearestCity().subscribe((response) => {
      this.aqi = response['data'].current.pollution.aqius;
      this.city = response['data'].city;
      this.weather = response['data'].current.weather;
      this.http
        .get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response['data'].location.coordinates[1]}&lon=${response['data'].location.coordinates[0]}&appid=bb08115ee62ead9f1188cc5419645a27`
        )
        .subscribe((res) => {
          this.dataSource = Object.keys(res['list'][0].components).map(
            (key) => ({
              name: key,
              value: res['list'][0].components[key],
            })
          );
          console.log(this.dataSource);
        });
      console.log(this.aqi);
      console.log(this.city);
    });
  }
  
}
