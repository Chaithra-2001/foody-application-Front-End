import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MerchantService } from '../services/merchant.service';

@Component({
  selector: 'app-bill-amount',
  templateUrl: './bill-amount.component.html',
  styleUrl: './bill-amount.component.css'
})
export class BillAmountComponent {
  display=false

 cart:boolean=true
  user:any
  selectedDishes: { name: string, price: number, quantity: number,cuisine:string,imageUrl:string }[] = [];
  billAmount: number = 0;
  message:any;
  constructor( private userService:UserService ,private merchantService:MerchantService,
    private router:Router, private sb:MatSnackBar){


  }

  ngOnInit(): void {
    this.selectedDishes=this.userService.selectedDish
    this.calculateBillAmount();
    this.userService.getUser().subscribe(data=>{this.user=data})


  }

  today: Date = new Date();
  currentDate: string = this.today.toISOString().split('T')[0];

  calculateBillAmount() {
    this.billAmount = this.selectedDishes.reduce((total, dish) => {
      return total + (dish.price * dish.quantity);
 },0);
}




emailDetail:any={
  recipient: '',
  msgBody: 'Thank you for placing an order with Jiffy Food Delivery! We appreciate your business.Your order is being processed, and our team is working diligently to ensure a smooth and timely delivery.If you have any questions or need assistance regarding your order, please don’t hesitate to contact our customer support team. We are here to help.Thank you for choosing Jiffy Food Delivery. We hope you enjoy your meal!!!',
  subject: 'Order Confirmation '
}


// orderMail(){
//   this.display=true;

// }
// )

// }

order:any;

orderConfirm(date:any,billAmount:any){



  this.userService.addOrder(this.selectedDishes,date,billAmount).subscribe();
  this.display=true;
   this.emailDetail.recipient=this.user.emailId
 this.userService.sendMail(this.emailDetail)
 this.userService.dishNull();
}


// reduceDishQuantity(dish: { name: string, price: number, quantity: number, cuisine: string, imageUrl: string }) {
//   const existingDish = this.selectedDishes.find(item => item.name === dish.name);
//   if (existingDish) {
//     // Reduce the quantity by 1 if it’s greater than 1
//     if (existingDish.quantity > 1) {
//       existingDish.quantity--;
//     }
//     this.calculateBillAmount();
//   }
// }

increaseDishQuantity(dish: { name: string, price: number, quantity: number, cuisine: string, imageUrl: string }) {
  const existingDish = this.selectedDishes.find(item => item.name === dish.name);
  if (existingDish) {
    // Reduce the quantity by 1 if it’s greater than 1
    if (existingDish.quantity >= 1) {
      existingDish.quantity++;
    }
    this.calculateBillAmount();
  }
}


reduceDishQuantity(dish: { name: string, price: number, quantity: number, cuisine: string, imageUrl: string }) {
  const index = this.selectedDishes.findIndex(item => item.name === dish.name);
  if (index !== -1) {
    const dishToDelete = this.selectedDishes[index];
    // If the dish quantity is greater than 1, decrement the quantity
    if (dishToDelete.quantity > 1) {
      dishToDelete.quantity--;
    } else {
      // Remove the dish from the array if the quantity is 1
      this.selectedDishes.splice(index, 1);
    }
    this.calculateBillAmount();
  }
}

cancelOrder(){
  this.userService.cancelOrder();

}


}
