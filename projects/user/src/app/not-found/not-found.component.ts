import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  standalone:true,
  imports:[],
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  constructor(private router: Router) { }
  goHome() {
    this.router.navigate(['']).then(x => { window.location.reload() });
  }

}
