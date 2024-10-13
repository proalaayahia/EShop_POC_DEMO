import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { ICart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { MaterialModule } from '../../Shared/material.module';
import { SharedModule } from '../../Shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit, OnDestroy {
  private service: CartService = inject(CartService)

  cart=signal<ICart[]>([])
  sortedData=signal<ICart[]>([])
  total=signal(0)
  isSuccess = false
  subscribe!: Subscription

  constructor(private toastr: ToastrService) {
  }
  ngOnInit(): void {
    this.cart.set(this.service.GetCart() ?? [] as ICart[])
    this.sortedData.set(this.cart().slice())
    this.getTotalCart()
  }

  plus(index: any) {
    this.cart()[index].quantity++
    this.getTotalCart()
    if (this.cart().length > 0) {
      this.service.SetCart(this.cart());
    }
  }
  minus(index: any) {
    let cart=this.cart()[index];
    cart.quantity--
    if (cart.quantity <= 0)
      cart.quantity = 1
    this.getTotalCart()
    if (this.cart().length > 0) {
      this.service.SetCart(this.cart());
    }
  }
  detectChange(index: any) {
    if (index && this.cart.length > 0) {
      let cart=this.cart()[index];
      if (cart.quantity <= 0) {
        alert($localize`your product quantity must be at least one item!`)
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: $localize`your product quantity must be at least one item!`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
        cart.quantity = 1
      }
      else {
        if (this.cart.length > 0) {
          this.service.SetCart(this.cart());
          this.sortedData.set(this.cart())
        }
      }
    }
  }
  getCartProducts() {
    this.cart.set(this.service.GetCart());
  }
  getTotalCart() {
    this.total.set(0)
    for (let i in this.cart()) {
      let cart=this.cart()[i]
      this.total.set(this.total()+ (cart.product.price * cart.quantity))
    }
    this.sortedData.set(this.cart())
  }
  clearCart() {
    this.cart.set([] as ICart[]);
    this.getTotalCart()
    this.service.SetCart(this.cart());
    this.sortedData.set(this.cart())
  }
  delete(index: number) {
    this.cart().splice(index, 1)
    this.getTotalCart()
    this.service.SetCart(this.cart());
    this.sortedData.set(this.cart())
  }
  orderCartNow() {
    if (this.cart().length > 0) {
      let cartProduct = this.cart().map(item => {
        return { productId: item.product.id, quantity: item.quantity }
      })
      let model = {
        userId: 5,
        date: new Date(),
        products: cartProduct
      }
      this.subscribe = this.service.addCart(model).subscribe({
        next: (res: any) => {
          this.service.DeleteCart()
          this.cart.set([] as ICart[]);
          this.getTotalCart()
          this.sortedData.set(this.cart())
          this.toastr.success($localize`Your order sent successfully.`, $localize`SUCCESS`)
        },
        error: (err: any) => { this.toastr.error(err, 'ERROR') }
      })
    }
  }
  sortData(sort: any) {
    const data = this.cart().slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData.set(data);
      return;
    }
    this.sortedData.set(data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title':
          return compare(a.product.title, b.product.title, isAsc);
        case 'price':
          return compare(a.product.price, b.product.price, isAsc);
        case 'quatity':
          return compare(a.quantity, b.quantity, isAsc);
        case 'total':
          return compare(a.quantity * a.product.price, b.quantity * a.product.price, isAsc);
        default:
          return 0;
      }
    }))
  }
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}