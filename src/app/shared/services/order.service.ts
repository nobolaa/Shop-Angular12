import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { DetailsOrder, Order } from "../interfaces/order.interface";

@Injectable({
    providedIn: 'root'
})

export class OrderService{
    private apiURL = 'http://localhost:3000';
    constructor(private http : HttpClient) { }

    saveOrder(order: Order):Observable<Order>{
        return this.http.post<Order>(this.apiURL + '/orders', order);
    }

    saveDetailsOrder(details: DetailsOrder):Observable<DetailsOrder>{
        return this.http.post<any>(this.apiURL + '/detailsOrders', details)
    }
}