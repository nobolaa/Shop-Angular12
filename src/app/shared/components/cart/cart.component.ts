import { Component } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-cart',
  template: `
  <ng-container *ngIf="{ total: total$ | async, quantity: quantity$ | async } as dataCart">
      <ng-container *ngIf="dataCart.quantity">
        <mat-icon>add_shopping_cart</mat-icon>
        {{dataCart.total | currency}}
        ({{dataCart.quantity}} items)
      </ng-container>
  </ng-container>
  `,
})
export class CartComponent {
  total$ = this.shoppingCartSvc.totalAction$;
  quantity$ = this.shoppingCartSvc.quantityAction$;

  constructor(private shoppingCartSvc: ShoppingCartService){}
}
