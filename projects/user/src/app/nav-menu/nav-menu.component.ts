import { Component, DoCheck, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CryptoService } from '../services/crypto.service';
import { isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../view/sidebar/sidebar.component';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements DoCheck {
  cart: any[] = []
  links = [
    { route: '', icon: 'home', text: $localize`Home` },
    { route: '', icon: 'apps', text: $localize`Services` },
    { route: 'products', icon: 'category', text: $localize`Products` },
    { route: '', icon: 'stay_primary_portrait', text: $localize`Contact` },
    { route: '', icon: 'settings', text: $localize`Settings` }
  ]
  constructor(private crypt: CryptoService,
    @Inject(PLATFORM_ID) private platformId: object) { }
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  ngDoCheck() {
    if (this.isBrowser()) {
      if ("cart" in localStorage) {
        this.cart = JSON.parse(this.crypt.decryptData(localStorage?.getItem("cart")))
      }
    }
  }
}
