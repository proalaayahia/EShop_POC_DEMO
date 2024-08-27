import { Component, DoCheck, inject } from '@angular/core';
import { SidebarComponent } from '../view/sidebar/sidebar.component';
import { CartModel } from '../models/cart.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements DoCheck {
  cart: CartModel[] = []
  links = [
    { route: '', icon: 'home', text: $localize`Home` },
    { route: '', icon: 'apps', text: $localize`Services` },
    { route: 'products', icon: 'category', text: $localize`Products` },
    { route: '', icon: 'stay_primary_portrait', text: $localize`Contact` },
    { route: '', icon: 'settings', text: $localize`Settings` }
  ]
  cartService = inject(CartService)
  constructor() { }

  ngDoCheck() {
    this.cart = this.cartService.GetCart();
  }
}
