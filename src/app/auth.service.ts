import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
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
    
    const expired:boolean=this.jwtHelper.isTokenExpired(token);
    
    if(token && !expired){
      
        
        return true
      
    }
    else if(token && expired){
    
      return false
    }
    else{
   
      return false
    }
  }
  
  currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;

    // const parts=token.split('.')
    // const decodedPayload=JSON.parse(atob(parts[1]));
    // const isAdmin=decodedPayload.admin
    
    // const decodedPayload=this.jwtHelper.decodeToken(token)
    // const isAdmin=decodedPayload.admin
    
    const decodedPayload=jwt_decode(token) ;
   
    return decodedPayload
  }
  
}
