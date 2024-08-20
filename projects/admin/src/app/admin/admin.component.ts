import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../user/src/app/view/sidebar/sidebar.component';

@Component({
  selector: 'app-admin',
  standalone:true,
  imports:[SidebarComponent],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent{
  links = [
    { route: 'dashboard', icon: 'dashboard', text: 'Dashboard' },
    { route: 'users', icon: 'people', text: 'User' },
    { route: 'products', icon: 'category', text: 'Product' },
    { route: 'sales', icon: 'local_atm', text: 'Sales' }
  ]
  constructor() { }
}
