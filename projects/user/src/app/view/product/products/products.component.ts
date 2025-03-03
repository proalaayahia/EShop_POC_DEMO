import { Component, computed, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as $ from 'jquery';
// import { fadeAnimtion } from '../../../../core/animations/fade.animation';
import { PageEvent } from '@angular/material/paginator';
import { IProductModel } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import { ICategory } from '../../../models/category.model';
import { SharedModule } from '../../../Shared/shared.module';
import { MaterialModule } from '../../../Shared/material.module';
import { CartService } from '../../../services/cart.service';
import { SelectComponent } from '../../select/select.component';
import { ProductComponent } from './product/product.component';
import { SpinnerService } from '../../../services/spinner.service';
import { ICart } from '../../../models/cart.model';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SharedModule, MaterialModule,
    ProductComponent, SelectComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // animations: [fadeAnimtion]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products = signal<IProductModel[]>([])
  paginatedProducts = signal<IProductModel[]>([])
  categories$!: Signal<Observable<ICategory[]>>
  cart = signal<ICart[]>([])
  cartService = inject(CartService);
  spinner = inject(SpinnerService)
  $isLoading = signal<Observable<boolean>>(this.spinner.isLoading$)
  subscribe!: Subscription
  //**********pagination*********** */
  totalProducts = signal<number>(0)
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent!: PageEvent;

  constructor(private service: ProductService) {
    
  }

  ngOnInit(): void {
    this.getAllProducts()
    this.getAllCategories()
    this.totalProducts.set(this.products().length)
    this.updatePaginatedProducts();
  }
  getAllProducts() {
    this.subscribe = this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products.set(res.products)
        console.log("all products", res.products)
        this.totalProducts.update(() => this.products().length)
        this.pageIndex = 0; // Reset to first page after filtering
        this.updatePaginatedProducts();
      }, error: (err: any) => console.log("something went error. " + err)
    });
  }

  getAllCategories() {
    this.categories$ = computed(() => this.service.getCategories())
  }

  filterCat(event: any) {
    let value = event;
    (value === 'all') ? this.getAllProducts() : this.getCategory(value);
  }

  getCategory(str: string) {
    let url = 'https://dummyjson.com/products/category/' + str
    $.ajax({
      method: 'GET',
      url: url,
      success: (res: any) => {
        this.products.set(res.products)
        this.totalProducts.update(() => this.products().length)
        this.pageIndex = 0;
        this.updatePaginatedProducts();
      },
      error: (err: any) => console.log(err)
    })
  }
  
  addToCart = (cart: ICart) => {
    this.cart.set(this.cartService.AddToCartFn(cart))
  }
  //pagination
  onPageChange(event: PageEvent) {
    this.pageEvent = event;
    this.totalProducts.update(() => event.length)
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedProducts();
  }

  updatePaginatedProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts.set(this.products().slice(startIndex, endIndex));
  }
  ngOnDestroy(): void {
    if (this.subscribe)
      this.subscribe.unsubscribe()
  }
}
