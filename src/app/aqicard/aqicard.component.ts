import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-aqicard',
  templateUrl: './aqicard.component.html',
  styleUrls: ['./aqicard.component.css'],
})
export class AqicardComponent implements OnInit {
  @Input() aqi: number;
  @Input() city: string;
  status: string;
  @Input() dataSource: any;

  constructor(private apiService: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    
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
  displayedColumns: string[] = ['name', 'value'];
}
