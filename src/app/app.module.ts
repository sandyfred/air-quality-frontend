import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CanActivateRouteGuard } from './can-activate-route.guard';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthenticationService } from './services/authentication.service';
import { RegisterService } from './services/register.service';
import { HomeComponent } from './home/home.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { AqicardComponent } from './aqicard/aqicard.component';
import { MatTableModule } from '@angular/material/table';
import { WeatherComponent } from './weather/weather.component';
import { MatDividerModule } from '@angular/material/divider';
import { SubscriptionComponent } from './subscription/subscription.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
  },
  { path: 'subscription', component: SubscriptionComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    SidenavListComponent,
    SearchComponent,
    FavouritesComponent,
    AqicardComponent,
    WeatherComponent,
    SubscriptionComponent,
    FooterComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    NoopAnimationsModule,
    FlexLayoutModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    HttpClientModule,
    LayoutModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    FlexLayoutModule,
    MatDividerModule,
    MatMenuModule,
    MatRadioModule,
  ],
  providers: [AuthenticationService, RegisterService, CanActivateRouteGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
