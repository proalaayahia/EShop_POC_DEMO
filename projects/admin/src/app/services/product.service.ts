import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl =  "https://fakestoreapi.com/products/" 
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl)
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.productUrl + 'categories')
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(this.productUrl + id)
  }
}
