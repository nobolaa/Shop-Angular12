import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Product } from "src/app/pages/products/interfaces/product.interface";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService{
    products: Product[] = [];

    private cartSubject = new BehaviorSubject<Product[]>([]);
    private totalSubject = new BehaviorSubject<number>(0);
    private quantitySubject = new BehaviorSubject<number>(0);

    get cartAction$(): Observable<Product[]>{
        return this.cartSubject.asObservable();
    }
    get totalAction$(): Observable<number>{
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number>{
        return this.quantitySubject.asObservable();
    }

    updateCart(product: Product): void{
        this.addToCart(product);
        this.calcQuantity();
        this.calcTotal();
    }

    resetCart(): void{
        this.products = [];

        this.cartSubject.next(this.products);
        this.totalSubject.next(0);
        this.quantitySubject.next(0);
    }

    private addToCart(product: Product):void{
        const isProductInCart = this.products.find( ({id}) => id == product.id );

        if(isProductInCart){
            isProductInCart.quantity++;
        }
        else{
            this.products.push({ ... product, quantity: 1 });
        }
        
        this.cartSubject.next(this.products);
    }
    private calcTotal():void{
        const total = this.products.reduce( (acc, prod) => acc += (prod.price*prod.quantity), 0);
        this.totalSubject.next(total);
    }
    private calcQuantity(): void{
        const quantity = this.products.reduce( (qty, prod) => qty += prod.quantity, 0);
        this.quantitySubject.next(quantity);
    }


}