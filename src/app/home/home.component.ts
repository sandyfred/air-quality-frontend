import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { COUNTRIES } from '../countries';
import { Router } from "@angular/router"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  aqi: number;
  city: string;
  state: string;
  country: string;
  status: string;

  countries = COUNTRIES;
  selectedCountry?: string;
  states: string[] = [];
  selectedState?: string;
  cities: string[] = [];
  selectedCity?: string;
  weather: any;

  constructor(private apiService: ApiService,private router: Router) {}

  ngOnInit(): void {
    this.apiService.getNearestCity().subscribe((response) => {
      this.aqi = response['data'].current.pollution.aqius;
      this.city = response['data'].city;
      this.weather = response['data'].current.weather;
      this.country = response['data'].country;
      this.state = response['data'].state;
    });
  }

  headerColor() {
    if (this.aqi >= 0 && this.aqi < 51) {
      this.status = 'Good';
      return 'green';
    } else if (this.aqi >= 51 && this.aqi < 101) {
      this.status = 'Moderate';
      return 'yellow';
    } else if (this.aqi >= 101 && this.aqi < 151) {
      this.status = 'Unhealthy for sensitive groups';
      return 'orange';
    } else if (this.aqi >= 151 && this.aqi < 201) {
      this.status = 'Unhealthy';
      return 'red';
    } else if (this.aqi >= 201 && this.aqi < 301) {
      this.status = 'Very Unhealthy';
      return 'purple';
    } else if (this.aqi >= 301) {
      this.status = 'Hazardous';
      return 'maroon';
    }
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
        this.state = response['data'].state;
        this.country = response['data'].country;
      });
  }

  routeToLogin() {
    localStorage.setItem('city', this.city);
    localStorage.setItem('country', this.country);
    localStorage.setItem('state',this.state);
    this.router.navigate(["../login"]);
  }
}
