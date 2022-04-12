import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from 'src/app/shared/services/data.service';
import { switchMap, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/services/order.service';
import { Details, Order } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interfaces/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

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
  isDelivery: boolean = false;
  cart: Product[] = [];

  constructor(private dataSvc: DataService, private orderSvc: OrderService, private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(option : boolean): void{
    this.isDelivery = option;
  }

  onSubmit({ value: formData }: NgForm):void{
    const dataOrder: Order = {
      id: formData.id,
      name: formData.name,
      shippingAddress: formData.shippingAddress,
      city: formData.city,
      store: formData.store,
      date: this.getCurrentDay(),
      pickup: this.isDelivery
    }

    this.orderSvc.saveOrder(dataOrder).pipe(
      switchMap( ({id: orderId}) => {
        const details = this.prepareDetails();
        return this.orderSvc.saveDetailsOrder({ details, orderId });
      } ),
    ).subscribe();
  }

  private getStores(): void{
    this.dataSvc.getStores()
      .pipe(
        tap((stores: Store[]) => this.stores = stores)
      ).subscribe();
  }

  private getCurrentDay():string{
    return new Date().toLocaleDateString();
  }

  private prepareDetails(): Details[]{
    const details : Details[] = [];

    this.cart.forEach((product: Product) => {
      const {id:productId, name:productName, quantity, stock} = product;
      details.push({productId, quantity, productName});
    })

    return details;
  }

  private getDataCart():void{
    this.shoppingCartSvc.cartAction$.pipe(
      tap((products : Product[]) => this.cart = products)
    ).subscribe();
  }
}
