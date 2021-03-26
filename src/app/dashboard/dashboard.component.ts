import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../services/favourite.service';
import { Aqi } from '../aqi';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  favs: Aqi[] = [];

  constructor(private favouriteService: FavouriteService) {}

  ngOnInit(): void {
    // console.log(this.favouriteService.getFavourites("sandyfred@gmail.com").subscribe(data => console.log(data)))
    this.favouriteService.getFavourites("sandyfred@gmail.com")
  }
}
