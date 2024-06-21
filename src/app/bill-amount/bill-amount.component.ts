
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bill-amount',
  templateUrl: './bill-amount.component.html',
  styleUrls: ['./bill-amount.component.css']
})
export class BillAmountComponent implements OnInit {

  cartItems: any[] = [];
  user: any;
  today: Date = new Date();
  currentDate: string = this.today.toISOString().split('T')[0];
  totalBill: number = 0;
  display: boolean = false;

  constructor(private us: UserService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.cartItems = this.us.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: item.price || 0
    }));
    this.calculateTotalBill();
    this.us.getUser().subscribe(
      data => {
        this.user = data;
      }
    );
  }

  removeFromCart(item: any) {
    this.us.removeFromCart(item);
    this.cartItems = this.us.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1,
      price: item.price || 0
    }));
    this.calculateTotalBill();
  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.calculateTotalBill();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.calculateTotalBill();
    }
  }

  calculateTotalBill() {
    this.totalBill = this.cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
  }

  placeOrder() {
    const order = this.cartItems.map(item => ({
      ...item,
      totalPrice: item.price * item.quantity
    }));
    const date = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const bill = this.totalBill;

    this.us.addOrder(order, date, bill).subscribe(
      response => {
        console.log('Order placed successfully:', response);
        this.display = true;
        this.us.clearCart();
        this.cartItems = [];
        this.totalBill = 0;
        this.router.navigateByUrl("/order-History")
        this.openSnackBar("your order succesfully placed")
      },
      error => {
        console.error('Error placing order:', error);
      }
    );
  }
  openSnackBar(message: string) {
    this.snackbar.open(message, 'Close', {
      duration: 5000
    });
  }
}
