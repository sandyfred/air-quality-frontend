import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(public authService: AuthenticationService) { 
  }

  ngOnInit(): void {
  }

  public onToggleSideNav =()=>{
    this.sidenavToggle.emit();
  }
  public loggingOut=()=>{
    this.authService.logout();
  }
}
