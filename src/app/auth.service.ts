import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(credentials:any){
    
    return this.http.post('/api/authenticate', credentials)
    .pipe(map((response)=>{

     
      if(response ){
        const loginResponse = response as {token:string}
        localStorage.setItem("token",loginResponse.token)
        return true
      }
      return false

    }))
  }

  logout(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    const token = localStorage.getItem('token');

    if(token){
      
        console.log("has token but it is")
        return true
      
    }
    else{
      console.log("No token. LOL")
      return false
    }
  } 
}
