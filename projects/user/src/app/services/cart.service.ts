import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  url: string="https://fakestoreapi.com/";
  constructor(private http: HttpClient) {
  }
  addCart(model: any) {
    return this.http.post(this.url + 'carts', model)
  }
}
