import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, interval, tap, timer } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Product } from '../../products/interfaces/product.interface';

@Component({
  selector: 'app-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss']
})
export class ThankYouPageComponent implements OnInit {
  segundos: number = 9;

  constructor(private shoppingCartSvc: ShoppingCartService, private router: Router) { }

  ngOnInit(): void {
    this.shoppingCartSvc.cartAction$.pipe(
      tap((products: Product[]) => {
        if (Array.isArray(products) && products.length==0){
          const timer = interval(1000).subscribe(() => {
            this.segundos--;
            if (this.segundos == 0){
              timer.unsubscribe();
              this.router.navigate(['/products']);
            }
          });
        }
      })
    ).subscribe();
  }

}
