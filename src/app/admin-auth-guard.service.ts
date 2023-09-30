import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private authService:AuthService,
    private router:Router) { }

  canActivate(state: RouterStateSnapshot){
    let isAdmin=(this.authService.currentUser() as {admin:boolean}).admin
    if(isAdmin){
      return true
    }
    else{
      console.log("you cannot access becasue youre not admin")
      this.router.navigate(['/no-access'])
      return false
    }
  }
}
