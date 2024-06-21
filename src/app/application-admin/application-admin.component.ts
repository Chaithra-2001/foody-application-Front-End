import { Component } from '@angular/core';
import { MerchantService } from '../services/merchant.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-admin',
  templateUrl: './application-admin.component.html',
  styleUrl: './application-admin.component.css'
})
export class ApplicationAdminComponent {
  allMerchantsData: any = []
  statusCode: boolean = false;
  message: any;

  constructor(private mercahntService: MerchantService, private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.mercahntService.getAllMerchants().subscribe(
      data => {
        this.allMerchantsData = data;
        console.log(data);
      })
  }

  getSerialNumber(merchantIndex: number, restaurantIndex: number): number {
    let serialNumber = 1;
    for (let i = 0; i < merchantIndex; i++) {
      serialNumber += this.allMerchantsData[i].restaurantList.length;
    }
    return serialNumber + restaurantIndex;
  }
  restaurantAproval(merchantId: any, restaurant: any) {

    this.mercahntService.setStatus(merchantId, restaurant).subscribe()
    this.ngOnInit();
  }


  restaurantReject(merchantId: any, restaurant: any) {
    this.mercahntService.setStatus(merchantId, restaurant).subscribe()
    this.ngOnInit();
  }
}
