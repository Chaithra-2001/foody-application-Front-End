import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {


  constructor(private us: UserService, private router: Router) {

  }

  user: any
  orderdata: Order[] = []
  ngOnInit(): void {

    this.getAllOrder()
    this.us.getUser().subscribe(
      data => {
        this.user = data;
      }
    )
  }


  getAllOrder() {
    this.us.getorder().subscribe(
      (response) => {
        this.orderdata = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }


  deleteOrder(orderId: any) {
    const isconfirmed = confirm("are you sure you want to cancel this order?")
    if (isconfirmed) {
      this.us.deleteOrder(orderId).subscribe()

      this.getAllOrder();
      this.router.navigateByUrl("/")
    }

  }
}
