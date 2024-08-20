import { Input, Component, Inject, PLATFORM_ID } from '@angular/core'
import { CommonModule, isPlatformBrowser } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatBadgeModule } from '@angular/material/badge'
import { MatMenuModule } from '@angular/material/menu'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatListModule } from '@angular/material/list'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-sidebar',
  standalone:true,
  imports:[CommonModule,RouterModule,MatToolbarModule,MatButtonModule,
    MatIconModule,MatBadgeModule,MatMenuModule,
    MatSidenavModule,MatFormFieldModule,MatListModule,MatInputModule
  ],
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
