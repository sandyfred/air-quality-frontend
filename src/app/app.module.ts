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
import { RouterModule, Routes } from '@angular/router';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';
import { RegisterService } from './services/register.service';

const appRoutes: Routes = [
  {path: 'register', component:RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [CanActivateRouteGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NoopAnimationsModule,
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
  ],
  providers: [
    RouterService,
    AuthenticationService,
    RegisterService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
