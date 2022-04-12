import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "src/app/shared/interfaces/store.interface";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class DataService{
    private apiURL = 'http://localhost:3000';
    constructor(private http : HttpClient) { }
  
    getStores():Observable<Store[]>{
      return this.http.get<Store[]>(this.apiURL + '/stores');
    }
}