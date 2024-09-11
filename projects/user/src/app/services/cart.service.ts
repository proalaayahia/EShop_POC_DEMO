import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { ICart } from "../models/cart.model";
import { API_BASE_URL } from "../core/constants/api.const";
import { StorageService } from "./storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storage = inject(StorageService);
  private toastService = inject(ToastrService);
  private authService = inject(AuthService);
  url!: string
  private data!: { active: boolean, id: number }
  constructor(private http: HttpClient,
    @Inject(API_BASE_URL) public apiUrl: string) {
    this.url = apiUrl
    this.data = this.isActiveUser();
  }
  addCart(model: any) {
    return this.http.post(this.url + '/carts/add', model)
  }

  SetCart = (cart: ICart[]) => {
    if (this.data.active) {
      this.storage.Set(`cart_${this.data.id}`, cart);
    }
  }


  GetCart = (): ICart[] => {
    if (this.data.active) {
      const cart = this.storage.Get(`cart_${this.data.id}`) as ICart[]
      return cart;
    }
    return [] as ICart[];
  };
  DeleteCart = () => {
    if (this.data.active) {
      this.storage.Delete(`cart_${this.data.id}`)
    }
  };

  AddToCartFn(cart: ICart): ICart[] {
    const _cart = this.GetCart() ?? [] as ICart[];
    if (!!_cart && _cart.length > 0) {
      const exists = _cart.find(item => { return item.product.id == cart.product.id })
      if (exists) {
        this.toastService.error(cart.product.title, $localize`ERROR`)
        return _cart;
      }
    }
    return this.PushInCartFn(_cart, cart)
  }

  private PushInCartFn(_cart: ICart[], cart: ICart): ICart[] {
    if (this.data.active) {
      _cart.push(cart)
      this.SetCart(_cart)
      this.toastService.success($localize`Item Added To Cart Successfully.`, $localize`SUCCESS`)
    }
    else {
      this.toastService.error($localize`UnAuthorized User!`, $localize`ERROR`)
    }
    return _cart;
  }
  isActiveUser = (): { active: boolean, id: number } => {
    const userId = this.authService.GetCurrentUser();
    return { active: userId > 0, id: userId };
  }
}