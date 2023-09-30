import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
constructor(private orderService:OrderService){}
orders!:any;
ngOnInit(){
  this.orderService.getOrders().subscribe(
(orders)=>{

  console.log("Good morning")
  console.log(orders)
  this.orders=orders
  console.log(this.orders)
  console.log("look above")
  console.log(Array.isArray(this.orders.data))
}
  )
}
}
