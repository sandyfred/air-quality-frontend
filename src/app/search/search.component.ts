import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { COUNTRIES } from '../countries';
import { Place } from '../place';
import { ApiService } from '../services/api.service';
import { ServerService } from '../services/server.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  countries = COUNTRIES;
  selectedCountry?: string;
  states: string[] = [];
  selectedState?: string;
  cities: string[] = [];
  selectedCity?: string;
  location: Place;

  aqi: number;
  city: string = localStorage.getItem('city');
  state: string = localStorage.getItem('state');
  country: string = localStorage.getItem('country');
  dataSource: any;
  weather: any;

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private serverService: ServerService
  ) {}

  ngOnInit(): void {
    // this.getNearestCityAqi();

    this.apiService
      .getCityAqi(this.country, this.state, this.city)
      .subscribe((response) => {
        this.aqi = response['data'].current.pollution.aqius;
        // this.city = response['data'].city;
        this.city = response['data'].city;
        this.country = response['data'].country;
        this.state = response['data'].state;
        this.weather = response['data'].current.weather;
        this.http
          .get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response['data'].location.coordinates[1]}&lon=${response['data'].location.coordinates[0]}&appid=9b1a694de27b21325960033c7ca8755f`
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
      .subscribe((response) => {
        this.aqi = response['data'].current.pollution.aqius;
        this.city = response['data'].city;
        this.country = response['data'].country;
        this.state = response['data'].state;
        this.weather = response['data'].current.weather;
        this.http
          .get(
            `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response['data'].location.coordinates[1]}&lon=${response['data'].location.coordinates[0]}&appid=9b1a694de27b21325960033c7ca8755f`
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
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${response['data'].location.coordinates[1]}&lon=${response['data'].location.coordinates[0]}&appid=9b1a694de27b21325960033c7ca8755f`
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

  addFav() {
    this.location = new Place(
      this.selectedCountry,
      this.selectedState,
      this.selectedCity
    );
    console.log(this.location);
    this.serverService.addFavourite(this.location);
  }
}
