import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name:'',
    store: '',
    shippingAddress: '',
    city: ''
  }

  stores!: Store[];
  isDelivery !: boolean;

  constructor(private dataSvc: DataService) { }

  ngOnInit(): void {
    this.getStores();
    this.isDelivery = false;
  }

  onPickupOrDelivery(option : boolean): void{
    this.isDelivery = option;
  }

  onSubmit({ value: formData }: NgForm):void{
    console.log("guardar", formData);
  }

  private getStores(): void{
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      ).subscribe();
  }

  
}
