import { isPlatformBrowser } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CryptoService } from "./crypto.service";
import { CartModel } from "../models/cart.model";
import { API_BASE_URL } from "../core/constants/api.const";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private crypt = inject(CryptoService);
  url!: string
  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) public apiUrl: string,
    @Inject(PLATFORM_ID) private platformId: any) {
      this.url=apiUrl
  }
  addCart(model: any) {
    return this.http.post(this.url + '/carts/add', model)
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
