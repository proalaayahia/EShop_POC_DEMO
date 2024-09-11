import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategory } from '../../models/category.model';
import { MaterialModule } from '../../Shared/material.module';
import { SharedModule } from '../../Shared/shared.module';

@Component({
  selector: 'app-select',
  standalone:true,
  imports:[MaterialModule,SharedModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  event: string = "all"
  @Input('isAll') isAllOption = true
 data$=input<Observable<ICategory[]>>()
  @Output() filterVal = new EventEmitter()
  constructor() { }

  filteration() {
    this.filterVal.emit(this.event)
    console.log("from select",this.event)
  }
}
