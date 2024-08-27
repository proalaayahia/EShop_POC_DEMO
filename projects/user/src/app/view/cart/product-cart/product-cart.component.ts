import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { CartService } from '../../../services/cart.service';
import { CartModel } from '../../../models/cart.model';
import { SharedModule } from '../../../Shared/shared.module';
import { MaterialModule } from '../../../Shared/material.module';
@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [SharedModule,MaterialModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit, OnDestroy {
  private service: CartService = inject(CartService)

  cart: CartModel[] = []
  sortedData: CartModel[] = [];
  total: any = 0
  isSuccess = false
  loading: boolean = false
  subscribe!: Subscription

  constructor(private toastr: NgToastService) {
    this.cart = this.service.GetCart();
    this.sortedData = this.cart.slice();
  }
  ngOnInit(): void {
    this.getTotalCart()
  }

  plus(index: any) {
    this.cart[index].quantity++
    this.getTotalCart()
    if (this.cart.length > 0) {
      this.service.SetCart(this.cart);
    }
  }
  minus(index: any) {
    this.cart[index].quantity--
    if (this.cart[index].quantity <= 0)
      this.cart[index].quantity = 1
    this.getTotalCart()
    if (this.cart.length > 0) {
      this.service.SetCart(this.cart);
    }
  }
  detectChange(index: any) {
    if (index && this.cart.length > 0) {
      if (this.cart[index].quantity <= 0) {
        alert($localize`your product quantity must be at least one item!`)
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: $localize`your product quantity must be at least one item!`,
          footer: '<a href="">Why do I have this issue?</a>'
        })
        this.cart[index].quantity = 1
      }
      else {
        if (this.cart.length > 0) {
          this.service.SetCart(this.cart);
          this.sortedData=this.cart
        }
      }
    }
  }
  getCartProducts() {
    this.cart = this.service.GetCart();
  }
  getTotalCart() {
    this.total = 0
    for (let i in this.cart) {
      this.total += this.cart[i].product.price * this.cart[i].quantity
    }
    this.sortedData=this.cart
  }
  clearCart() {
    this.cart = [] as CartModel[];
    this.getTotalCart()
    this.service.SetCart(this.cart);
    this.sortedData=this.cart
  }
  delete(index: number) {
    this.cart.splice(index, 1)
    this.getTotalCart()
    this.service.SetCart(this.cart);
    this.sortedData=this.cart
  }
  orderCartNow() {
    if (this.cart.length > 0) {
      this.loading = true
      let cartProduct = this.cart.map(item => {
        return { productId: item.product.id, quantity: item.quantity }
      })
      let model = {
        userId: 5,
        date: new Date(),
        products: cartProduct
      }
      this.subscribe = this.service.addCart(model).subscribe({
        next: (res: any) => {
          this.toastr.success($localize`Your order sent successfully.`, $localize`SUCCESS`, 3000)
          this.loading = false
        },
        error: (err: any) => { this.toastr.danger(err, 'ERROR', 3000) }
      })
    }
  }
  sortData(sort: any) {
    const data = this.cart.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
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
    });
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