import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone:true,
  imports:[RouterModule,MatFormFieldModule,MatIconModule,MatInputModule,
    MatButtonModule,
    FormsModule,CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  stars: any[] = []
  greyStars: any[] = []
  starHalf: any[] = []
  addBtn: boolean = false
  amount: number = 0
  @Input() data: any = {}
  @Output() action = new EventEmitter()
  constructor() { }
  add(event:any) {
    console.log(event)
    this.action.emit({ item: this.data, quantity: this.amount })
  }
  starIn(rate: number) {
    switch (Math.round(rate)) {
      case 1:
        this.stars = [1]
        this.starHalf = [2]
        this.greyStars = [3, 4, 5]
        break;
      case 2:
        this.stars = [1, 2]
        this.greyStars = [3, 4, 5]
        break;
      case 3:
        this.stars = [1, 2, 3]
        this.greyStars = [4, 5]
        break;
      case 4:
        this.stars = [1, 2, 3]
        this.starHalf = [4]
        this.greyStars = [5]
        break;
      case 5:
        this.stars = [1, 2, 3, 4, 5]
        this.greyStars = []
        break;
    }
    return this.stars;
  }
}
