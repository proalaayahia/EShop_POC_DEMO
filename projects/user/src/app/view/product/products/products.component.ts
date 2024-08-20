import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as $ from 'jquery';
import { NgToastService } from 'ng-angular-popup';
// import { fadeAnimtion } from '../../../../core/animations/fade.animation';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { SelectComponent } from '../../select/select.component';
import { ProductComponent } from './product/product.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ProductModel } from '../../../models/product.model';
import { CryptoService } from '../../../services/crypto.service';
import { ProductService } from '../../../services/product.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SelectComponent, CommonModule, MatPaginatorModule,
    ProductComponent, SpinnerComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // animations: [fadeAnimtion]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductModel[] = []
  paginatedProducts: ProductModel[] = []
  categories$!: Observable<string[]>
  cart: any[] = []
  isLoading: boolean = false
  isAdded: boolean = false
  subscribe!: Subscription
  //**********pagination*********** */
  totalProducts: number = 0
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  constructor(private service: ProductService,
    private crypt: CryptoService,
    @Inject(PLATFORM_ID) private platformId: any,
    private toastService: NgToastService
  ) {
    this.getAllProducts()
    this.getAllCategories()
  }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  ngOnInit(): void {
    this.totalProducts = this.products.length
    this.updatePaginatedProducts();
  }
  getAllProducts() {
    this.isLoading = true;
    this.subscribe = this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res
        this.isLoading = false
        this.totalProducts = this.products.length;
        this.pageIndex = 0; // Reset to first page after filtering
        this.updatePaginatedProducts();
      }, error: (err: any) => console.log("something went error. " + err)
    });
  }

  getAllCategories() {
    this.categories$ = this.service.getCategories()
  }

  filterCat(event: any) {
    let value = event;
    (value === 'all') ? this.getAllProducts() : this.getCategory(value);
  }

  getCategory(str: string) {
    let url = 'https://fakestoreapi.com/products/category/' + str
    $.ajax({
      method: 'GET',
      url: url,
      success: (res: any) => {
        this.products = res
        this.totalProducts = this.products.length;
        this.pageIndex = 0;
        this.updatePaginatedProducts();
      },
      error: (err: any) => console.log(err)
    })
  }
  addToCart(event: any) {
    if (this.isBrowser()) {
      if ("cart" in localStorage) {
        this.cart = JSON.parse(this.crypt.decryptData(localStorage?.getItem("cart")!))
        let exist = this.cart.find(item => item.item.id == event.item.id)
        if (exist) {
          this.toastService.danger(event.item.title, $localize`ERROR`, 5000)
        }
        else {
          this.cart.push(event)
          localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
          this.toastService.success($localize`Item Added To Cart Successfully.`, $localize`SUCCESS`, 5000)
        }
      }
      else {
        this.cart.push(event)
        localStorage?.setItem("cart", this.crypt.encryptData(JSON.stringify(this.cart)))
        this.toastService.success($localize`Item Added To Cart Successfully.`, $localize`SUCCESS`, 5000)
      }
    }
  }
  //pagination
  onPageChange(event: PageEvent) {
    this.pageEvent = event;
    this.totalProducts = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }
  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe()
  }
}
