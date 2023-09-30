import { Injectable } from '@angular/core';
import {  Router,CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService:AuthService,
     private router:Router) { }

  canActivate(state: RouterStateSnapshot){
if(this.authService.isLoggedIn()){
  return true
}

else
{
 
  this.router.navigate(['/login'], 
  {queryParams:{returnUrl:state.url}}
  )
return false
}
  }
}
