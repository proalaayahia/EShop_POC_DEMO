import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-details',
  standalone:true,
  imports:[SpinnerComponent,CommonModule,MatButtonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  // providers: [VoiceRecognitionService]
})
export class DetailsComponent implements OnInit, OnDestroy {
  id: any
  product: any = {}
  isLoading: boolean = false
  subscriping!: Subscription
  text!: string;
  constructor(private activeRoute: ActivatedRoute, private service: ProductService) {
    this.id = this.activeRoute.snapshot.paramMap.get("id")
    // this.voiceService.init();
  }

  ngOnInit(): void {
    this.getPoductDetails(this.id)
  }
  getPoductDetails(ID: number) {
    this.isLoading = true
    this.subscriping = this.service.getProductById(ID).subscribe({
      next:(res:any) => {
        this.product = res
        this.isLoading = false
      },
      error:(err:any)=>console.log(err)
    })
  }
  ngOnDestroy(): void {
    this.subscriping.unsubscribe()
  }

  startService() {
    // this.voiceService.start()
  }

  stopService() {
    // this.voiceService.stop()
  }
}
