import { Component } from '@angular/core';
import { SidebarComponent } from '../view/sidebar/sidebar.component';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  links = [
    { route: '', icon: 'home', text: $localize`Home` },
    // { route: '', icon: 'apps', text: $localize`Services` },
    { route: 'products', icon: 'category', text: $localize`Products` },
    // { route: '', icon: 'stay_primary_portrait', text: $localize`Contact` },
    // { route: '', icon: 'settings', text: $localize`Settings` }
  ]
  constructor() { }
}
