import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
// name:string=(this.authService.currentUser() as { name: string }).name
name!:string;
constructor(private authService: AuthService) {}

onLogoutClick(){
  return this.authService.logout()
}

isLoggedIn(){
  return this.authService.isLoggedIn()
}

isAdmin(){
  return (this.authService.currentUser() as {admin:boolean}).admin
}

getUserName(){
  return (this.authService.currentUser() as {name:string}).name
}
}
