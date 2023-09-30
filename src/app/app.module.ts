import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NoAccessComponent } from './no-access/no-access.component';
import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms'; 
import { AuthService } from './auth.service';
import { AuthenticationInterceptor } from './fake-backend';
import { LogoutComponent } from './logout/logout.component';
import { JWT_OPTIONS,JwtHelperService } from '@auth0/angular-jwt';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    AdminComponent,
    NoAccessComponent,
    LogoutComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path:'',component:HomePageComponent},
     {path:'login',component:LoginComponent},
     {path:'admin',
     component:AdminComponent,
     canActivate:[AuthGuard,AdminAuthGuard],
    
    },
     {path:'no-access',component:NoAccessComponent}
    ])
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    JwtHelperService,
    // Add the interceptor to the providers array
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    {
      provide: JWT_OPTIONS, 
      useValue: JWT_OPTIONS 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
