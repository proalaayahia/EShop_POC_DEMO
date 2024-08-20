import { Component, HostListener } from '@angular/core';
import { NavMenuComponent } from '../nav-menu/nav-menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone:true,
  imports:[NavMenuComponent,CommonModule],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  isOffline!: boolean
  @HostListener(`window:offline`, [`$event`])
  isWindowOnline(event: any) {
    if (event.type === 'offline')
      this.isOffline = true
  }
  constructor() { }
  refresh() {
    window.location.reload()
  }
}
