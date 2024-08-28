import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IProductModel } from '../models/product.model';
import { ICategory } from '../models/category.model';
import { API_BASE_URL } from '../core/constants/api.const';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productUrl!: string
  constructor(private http: HttpClient, @Inject(API_BASE_URL) public apiUrl: string) {
    this.productUrl = `${this.apiUrl}/products`
  }

  getProducts(): Observable<IProductModel[]> {
    return this.http.get<IProductModel[]>(this.productUrl)
  }
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.productUrl}/categories`)
  }
  // getProductByCategory(filter: string): Observable<any[]> {
  //   return this.http.get<any[]>(this.productUrl + 'category/' + filter)
  // }
  getProductById(id: number): Observable<IProductModel> {
    return this.http.get<IProductModel>(`${this.productUrl}/${id}`)
  }
}
