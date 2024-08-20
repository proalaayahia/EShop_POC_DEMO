import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'swiper/core';

@Component({
  selector: 'app-home',
  standalone:true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor() { }

  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
