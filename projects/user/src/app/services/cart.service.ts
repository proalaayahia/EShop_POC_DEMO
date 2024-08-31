import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";

import { CartModel } from "../models/cart.model";
import { API_BASE_URL } from "../core/constants/api.const";
import { StorageService } from "./storage.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storage = inject(StorageService);
  url!: string
  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) public apiUrl: string) {
    this.url = apiUrl
  }
  addCart(model: any) {
    return this.http.post(this.url + '/carts/add', model)
  }

  SetCart = (cart: CartModel[]) => this.storage.Set("cart", cart);

  GetCart = () => this.storage.Get("cart") as CartModel[];
}