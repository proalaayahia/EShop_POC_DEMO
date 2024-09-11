import { Input, Component, Inject, PLATFORM_ID, inject } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { SharedModule } from '../../Shared/shared.module'
import { MaterialModule } from '../../Shared/material.module'
import { ICart } from '../../models/cart.model'
import { StorageService } from '../../services/storage.service'
import { Router } from '@angular/router'

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
export class SidebarComponent {
  @Input() links: any[] = []
  opened: boolean = false
  @Input('Shopping_Cart') cart: ICart[] = []
  @Input() isNav: boolean = false;
  @Input() isLoggedIn: boolean = false;
  public isMobile: boolean = false;
  storage = inject(StorageService)
  router = inject(Router)
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
  }
  logout = () => {
    this.storage.Delete('token')
    document.location.reload()
  }
}
