import { Component } from '@angular/core';
import { PurchaseService } from '../utils/service/purchase.service';
import { PurchaseResponse } from '../utils/response/purchase.response';
import { format } from 'date-fns';


@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent {
  purchases: PurchaseResponse[] = [];
  isLoading = true;

  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
      const container = document.querySelector('.container');
      if (container) {
        container.classList.add('show');
      }
    }, 1000);
    this.loadUserPurchases();
  }

  loadUserPurchases(): void {
    this.purchaseService.getPurchaseService().subscribe(
      (response: any) => {
        console.log(response);
        this.purchases = response.purchase.map((purchase: PurchaseResponse) => ({
          ...purchase,
          purchase_date: format(new Date(purchase.purchase_date), 'yyyy-MM-dd HH:mm:ss')
        }));
      },
      (error) => {
        console.log('Error fetching user purchases:', error);
      }
    );
  }
  
  

}
