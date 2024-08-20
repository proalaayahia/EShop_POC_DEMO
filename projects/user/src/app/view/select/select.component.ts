import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-select',
  standalone:true,
  imports:[CommonModule,MatFormFieldModule,MatSelectModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  event: string = "all"
  @Input('isAll') isAllOption = true
  @Input() data$!: Observable<string[]>;
  @Output() filterVal = new EventEmitter()
  constructor() { }

  filteration() {
    this.filterVal.emit(this.event)
  }
}
