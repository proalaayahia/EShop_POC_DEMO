import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ICart } from "../models/cart.model";
import { API_BASE_URL } from "../core/constants/api.const";
import { StorageService } from "./storage.service";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url!: string
  private data!: { isActive: boolean, id: number }
  private cartCounter!: BehaviorSubject<number>;

  constructor(private http: HttpClient, private storage: StorageService,
    private authService: AuthService,
    private toastService: ToastrService,
    @Inject(API_BASE_URL) public apiUrl: string) {
    this.url = apiUrl
    this.data = this.userData();
    this.cartCounter = new BehaviorSubject<number>(0);
  }
  addCart(model: any) {
    return this.http.post(this.url + '/carts/add', model)
  }

  SetCart = (cart: ICart[]) => {
    if (this.data.isActive) {
      this.storage.Set(`cart_${this.data.id}`, cart);
      this.cartCounter.next(cart.length)
    }
  }


  GetCart = (): ICart[] => {
    if (this.data.isActive) {
      const cart = this.storage.Get(`cart_${this.data.id}`) as ICart[]
      this.cartCounter.next(cart.length);
      return cart;
    }
    this.cartCounter.next(0);
    return [] as ICart[];
  };
  DeleteCart = () => {
    if (this.data.isActive) {
      this.storage.Delete(`cart_${this.data.id}`)
      this.cartCounter.next(0);
    }
  };

  AddToCartFn(cart: ICart): ICart[] {
    const storageCart = this.GetCart() ?? [] as ICart[];
    if (!!storageCart && storageCart.length > 0) {
      const exists = storageCart.find(item => { return item.product.id == cart.product.id })
      if (exists) {
        this.toastService.error(cart.product.title, $localize`ERROR`)
        return storageCart;
      }
    }
    return this.PushInCartFn(storageCart, cart)
  }

  private PushInCartFn(_cart: ICart[], cart: ICart): ICart[] {
    if (this.data.isActive) {
      _cart.push(cart)
      this.SetCart(_cart)
      this.toastService.success($localize`Item Added To Cart Successfully.`, $localize`SUCCESS`)
    }
    else {
      this.toastService.error($localize`UnAuthorized User!`, $localize`ERROR`)
    }
    return _cart;
  }
  cartLength = (): BehaviorSubject<number> => {
    return this.cartCounter;
  }
  private userData = (): { isActive: boolean, id: number } => {
    const userId = this.authService.GetCurrentUser();
    return { isActive: userId > 0, id: userId };
  }
}