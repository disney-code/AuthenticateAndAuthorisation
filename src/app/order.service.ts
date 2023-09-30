import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders(){
    const jwt = localStorage.getItem('token');
    
    const headers = new HttpHeaders().set("Authorization",`Bearer ${jwt}`)
    return this.http.get('/api/orders', {headers})
  }
}
