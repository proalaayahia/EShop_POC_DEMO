import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { TableButtonAction } from '../../../models/tableButtonAction';
import { TableConsts } from '../consts/table';


@Component({
  selector: '[action-buttons]',
  standalone:true,
  imports:[MatIconModule,MatMenuModule,MatButtonModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css'],
})
export class ActionButtonsComponent{
  constructor() { }

  @Input() value!: string
  @Output() buttonAction: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>()

  onEditClick() {
    this.buttonAction.emit({
      name: TableConsts.actionButton.edit,
      value: this.value,
    })
  }
  onDeleteClick() {
    this.buttonAction.emit({ name: TableConsts.actionButton.delete, value: this.value })
  }
  onViewClick() {
    this.buttonAction.emit({ name: TableConsts.actionButton.view, value: this.value })
  }
}
