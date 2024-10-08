import { Input, Component, Inject, PLATFORM_ID, inject, OnInit } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { SharedModule } from '../../Shared/shared.module'
import { MaterialModule } from '../../Shared/material.module'
import { StorageService } from '../../services/storage.service'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  host: {
    'ngSkipHydration': ''  // This adds the ngSkipHydration attribute to the host element
  },
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  @Input() links: any[] = []
  @Input() isNav: boolean = false;
  opened: boolean = false
  isLoggedIn!: boolean
  cartLength: number = 0;
  public isMobile: boolean = false;
  storage = inject(StorageService)
  router = inject(Router)
  authService = inject(AuthService);
  cartService = inject(CartService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const mobileQuery = window.matchMedia('(max-width: 600px)');
      this.isMobile = mobileQuery.matches;
      // Listen for changes in media query
      mobileQuery.addEventListener('change', (event) => {
        this.isMobile = event.matches;
      });
    } else {
      // Default value for SSR
      this.isMobile = false;
    }
    this.authService.isLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
    })
    this.cartService.cartLength().subscribe(value => {
      this.cartLength = value
    })
  }
  ngOnInit(): void {
      this.cartService.GetCart()
  }
  logout = () => {
    this.authService.logout();
  }
}
