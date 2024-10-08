import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IProductModel } from '../../../../models/product.model';
import { ICart } from '../../../../models/cart.model';
import { SharedModule } from '../../../../Shared/shared.module';
import { MaterialModule } from '../../../../Shared/material.module';
import { HighlightProductDirective } from '../../../../core/directives/highlight-product.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule, MaterialModule,HighlightProductDirective],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  stars: any[] = []
  addBtn: boolean = false
  amount: number = 0
  @Input() data!: IProductModel
  @Output() action = new EventEmitter()
  constructor() { }
  addProduct() {
    const cart: ICart = { product: this.data, quantity: this.amount }
    this.action.emit(cart)
  }
  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border');
    }
    return stars;
  }
}
