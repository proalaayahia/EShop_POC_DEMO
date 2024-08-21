import { Component, Inject, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { CartService } from '../../../services/cart.service';
import { CryptoService } from '../../../services/crypto.service';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule,
    MatFormFieldModule, MatIconModule, FormsModule, SpinnerComponent, RouterModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit, OnDestroy {
  private service: CartService = inject(CartService)

  cart: any[] = []
  total: any = 0
  isSuccess = false
  loading: boolean = false
  subscribe!: Subscription
  constructor(private toastr: NgToastService,
    private crypt: CryptoService,
    @Inject(PLATFORM_ID) private platformId: any,@Inject(DOCUMENT) private document: Document
  ) {
    if (this.isBrowser()) {
      if ("cart" in localStorage) {
        this.cart = JSON.parse(this.crypt.decryptData(localStorage?.getItem("cart")))
      }
    }
  }
  ngOnInit(): void {
    if (this.isBrowser()) {
      this.getTotalCart()
    }
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  plus(index: any) {
    if (this.isBrowser()) {
      this.cart[index].quantity++
      this.getTotalCart()
      if (this.cart.length > 0) {
        localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
      }
    }
  }
  minus(index: any) {
    this.cart[index].quantity--
    if (this.cart[index].quantity <= 0)
      this.cart[index].quantity = 1
    this.getTotalCart()
    if (this.isBrowser()) {
      if (this.cart.length > 0) {
        localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
      }
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
        this.getTotalCart()
        if (this.isBrowser()) {
          localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
        }
      }
    }
  }
  getCartProducts() {
    if (this.isBrowser()) {
      if ("cart" in localStorage) {
        this.cart = JSON.parse(this.crypt.decryptData(localStorage?.getItem("cart")!))
      }
    }
  }
  getTotalCart() {
    if (this.isBrowser()) {
      this.total = 0
      for (let i in this.cart) {
        this.total += this.cart[i].item.price * this.cart[i].quantity
      }
    }
  }
  clearCart() {
    if (this.isBrowser()) {
      this.cart = []
      this.getTotalCart()
      localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
    }
  }
  delete(index: number) {
    if (this.isBrowser()) {
      this.cart.splice(index, 1)
      this.getTotalCart()
      localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
    }
  }
  orderCartNow() {
    if (this.cart.length > 0) {
      this.loading = true
      let cartProduct = this.cart.map(item => {
        return { productId: item.item.id, quantity: item.quantity }
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
  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe()
    }
  }
}
