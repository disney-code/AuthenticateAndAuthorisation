import { Injectable } from '@angular/core';
import {  Router,CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(){
if(this.authService.isLoggedIn()){
  return true
}

else
{
  console.log("not allowed to access /admin")
  this.router.navigate(['/login'])
return false
}
  }
}
