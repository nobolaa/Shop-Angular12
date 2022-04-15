import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURL = 'http://localhost:3000/products';
  constructor(private http : HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURL);
  }

  updateProductBought(id: number, stock: number): Observable<any>{
    const params = { "stock" : stock };
    return this.http.patch<any>(`${this.apiURL}/${id}`, params);
  }
}
