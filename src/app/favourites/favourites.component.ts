import { Component, OnInit } from '@angular/core';
import { Favourite } from '../favourite';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  isFavouriteExists: boolean = true;
  favs: Favourite[] = [{
    aqi: 90,
    city: "kollam",
    country: "ind",
    state: "kerala",
    pollutants: {
      co: "45",
      no2: "45",
      o3: "45",
      pm2_5: "56",
      pm10: "34",
      so2: "45"
    }
  },{
    aqi: 90,
    city: "trv",
    country: "ind",
    state: "kerala",
    pollutants: {
      co: "45",
      no2: "45",
      o3: "45",
      pm2_5: "56",
      pm10: "34",
      so2: "45"
    }
  }];

  constructor(private serverService: ServerService) { }

  ngOnInit(): void {
    // this.serverService.getFavourites('sandyfred@gmail.com').subscribe(
    //   (favs) => {
    //     this.favs = favs;
    //     this.isFavouriteExists = true;
    //   },
    //   (err) => (this.isFavouriteExists = false)
    // );
  }

  removeFromFavourites(fav: Favourite) {
    this.favs.splice(this.favs.indexOf(fav), 1);
    this.serverService
      .deleteFavourite('sandyfred@gmail.com', fav.city)
      .subscribe((data) => console.log(data));
  }

}
