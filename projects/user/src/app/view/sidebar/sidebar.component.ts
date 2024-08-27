import { Input, Component, Inject, PLATFORM_ID } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { SharedModule } from '../../Shared/shared.module'
import { MaterialModule } from '../../Shared/material.module'

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports:[SharedModule,MaterialModule],
  host: {
    'ngSkipHydration': ''  // This adds the ngSkipHydration attribute to the host element
  },
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() links: any[] = []
  opened: boolean=false
  @Input('Shopping_Cart') cart: any[]=[]
  @Input() isNav: boolean=false;
  public isMobile: boolean=false;

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
}
