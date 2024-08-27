import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../view/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';

const modules = [CommonModule, ReactiveFormsModule, FormsModule,
  RouterModule, SpinnerComponent, NgToastModule]

@NgModule({
  imports: modules,
  exports: [...modules]
})
export class SharedModule { }
