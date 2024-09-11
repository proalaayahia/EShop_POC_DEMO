import { Component, computed, DoCheck, inject, signal, Signal } from '@angular/core';
import { SidebarComponent } from '../view/sidebar/sidebar.component';
import { ICart } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements DoCheck {
  cart: Signal<ICart[]> = signal([])
  isLogged: Signal<boolean> = signal(false)
  links = [
    { route: '', icon: 'home', text: $localize`Home` },
    // { route: '', icon: 'apps', text: $localize`Services` },
    { route: 'products', icon: 'category', text: $localize`Products` },
    // { route: '', icon: 'stay_primary_portrait', text: $localize`Contact` },
    // { route: '', icon: 'settings', text: $localize`Settings` }
  ]
  cartService = inject(CartService)
  storage = inject(StorageService)
  constructor() {}

  ngDoCheck() {
    this.cart = computed(() => this.cartService.GetCart() ?? [] as ICart[]);
    this.isLogged = computed(() => !!this.storage.Get('token'))
    console.log(this.cart())
  }
}
