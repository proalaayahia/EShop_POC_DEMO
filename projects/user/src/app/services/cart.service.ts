import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CryptoService } from "./crypto.service";
import { CartModel } from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private crypt = inject(CryptoService);
  url: string = "https://fakestoreapi.com/";
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
  }
  addCart(model: any) {
    return this.http.post(this.url + 'carts', model)
  }
  isBrowser = () => isPlatformBrowser(this.platformId);

  SetCart = (cart: CartModel[]) => {
    if (this.isBrowser()) {
      localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(cart)))
    }
  }
  GetCart = () => {
    let cart = [] as CartModel[]
    if (this.isBrowser()) {
      if ("cart" in localStorage) {
        cart = JSON.parse(this.crypt.decryptData(localStorage?.getItem("cart"))) as CartModel[]
      }
    }
    return cart;
  }
}
