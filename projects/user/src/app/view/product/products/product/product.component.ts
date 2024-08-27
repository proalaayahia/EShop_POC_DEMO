import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IProductModel } from '../../../../models/product.model';
import { CartModel } from '../../../../models/cart.model';
import { SharedModule } from '../../../../Shared/shared.module';
import { MaterialModule } from '../../../../Shared/material.module';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SharedModule,MaterialModule],
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
    this.action.emit({ product: this.data, quantity: this.amount } as CartModel)
  }
  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border');
    }
    return stars;
  }
}
