import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private jwtHelper: JwtHelperService) { }

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
    console.log("Token11: ", token)
    const expired:boolean=this.jwtHelper.isTokenExpired(token);
    console.log("Token: ", token)
    console.log("is token expired?:",expired)
    if(token && !expired){
      
        console.log("has token ")
        return true
      
    }
    else if(token && expired){
      console.log("token expired")
      return false
    }
    else{
      console.log("No token. LOL ddd")
      return false
    }
  }
  
  currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;

    // const parts=token.split('.')
    // const decodedPayload=JSON.parse(atob(parts[1]));
    // const isAdmin=decodedPayload.admin
    const decodedPayload=this.jwtHelper.decodeToken(token)
    const isAdmin=decodedPayload.admin
    return isAdmin
  }
  
}
