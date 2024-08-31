import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IProductModel } from '../../../models/product.model';
import { MaterialModule } from '../../../Shared/material.module';
import { SharedModule } from '../../../Shared/shared.module';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [SharedModule, MaterialModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  // providers: [VoiceRecognitionService]
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: any
  product!: IProductModel
  isLoading: boolean = false
  subscriping!: Subscription
  text!: string;
  selectedImage: string = "";

  constructor(private activeRoute: ActivatedRoute) {
    // this.voiceService.init();
  }

  ngOnInit(): void {
    // this.getPoductDetails(this.id)
    this.subscriping = this.activeRoute.data.subscribe({
      next: (result) => {
        console.log(result)
        this.product = result['product']
      },
      error: (err) => console.log(err)
    })
    this.selectedImage = this.product.images[0] || this.product.thumbnail
  }
  // getPoductDetails(ID: number) {
  //   this.isLoading = true
  //   this.subscriping = this.service.getProductById(ID).subscribe({
  //     next: (res: any) => {
  //       console.log(res)
  //       this.product = res
  //       this.isLoading = false
  //     },
  //     error: (err: any) => console.log(err)
  //   })
  // }
  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? 'star' : 'star_border');
    }
    return stars;
  }
  swapImage(image: string): void {
    this.selectedImage = image;
  }
  ngOnDestroy(): void {
    if (this.subscriping) {
      this.subscriping.unsubscribe()
    }
  }

  startService() {
    // this.voiceService.start()
  }

  stopService() {
    // this.voiceService.stop()
  }
}
