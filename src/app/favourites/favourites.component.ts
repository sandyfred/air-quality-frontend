import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Favourite } from '../favourite';
import { ServerService } from '../services/server.service';


@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  isFavouriteExists: boolean = false;
  favs: any[]
  // favs: Favourite[] = [{
  //   aqi: 90,
  //   city: "kollam",
  //   country: "ind",
  //   state: "kerala",
  //   pollutants: {
  //     co: "45",
  //     no2: "45",
  //     o3: "45",
  //     pm2_5: "56",
  //     pm10: "34",
  //     so2: "45"
  //   }
  // },{
  //   aqi: 90,
  //   city: "trv",
  //   country: "ind",
  //   state: "kerala",
  //   pollutants: {
  //     co: "45",
  //     no2: "45",
  //     o3: "45",
  //     pm2_5: "56",
  //     pm10: "34",
  //     so2: "45"
  //   }
  // }];

  constructor(private serverService: ServerService,private router: Router) { }

  ngOnInit(): void {
    this.serverService.getFavourites().subscribe(
      
      (favs) => {
        console.log(favs)
        this.favs = favs;
        this.isFavouriteExists = true;
        console.log(favs);
      },
      (err) => {
        console.log(err);
        this.router.navigate(['/login']);
        this.isFavouriteExists = false
      }
    );
  }

  removeFromFavourites(fav: Favourite) {
    this.favs.splice(this.favs.indexOf(fav), 1);
    this.serverService
      .deleteFavourite(fav.city)
      .subscribe((data) => console.log(data));
  }

  

}
