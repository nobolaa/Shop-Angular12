import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span>My Store </span>
      {{quantity$ | async | json}} - Quantity
      {{total$ | async | json}} - Total
    </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cart$ = this.shoppingCartSvc.cartAction$;
  total$ = this.shoppingCartSvc.totalAction$;
  quantity$ = this.shoppingCartSvc.quantityAction$;

  constructor(private shoppingCartSvc: ShoppingCartService){}
}
