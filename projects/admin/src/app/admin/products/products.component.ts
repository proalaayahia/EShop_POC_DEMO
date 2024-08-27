import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatCustomTableComponent } from '../mat-custom-table/mat-custom-table.component';
import { DialogOverviewExampleDialog } from '../dialogs/dialog-overview-example-dialog';
import { ProductModel } from '../../models/products.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCustomTableComponent, CommonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    DialogOverviewExampleDialog,
    ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  columns = [
    { columnDef: 'image', header: 'Image' },
    { columnDef: 'title', header: 'Title' },
    { columnDef: 'category', header: 'Category' },
    { columnDef: 'price', header: 'Price' },
    { columnDef: 'rating1', header: 'Rate' },
    { columnDef: 'rating2', header: 'Count' }
  ]
  products$: Observable<ProductModel[]>;
  subscribtion!: Subscription;
  constructor(private service: ProductService, public dialog: MatDialog) {
    this.products$ = this.service.getProducts()
    // Assign the data to the data source for the table to render
  }
  onTableAction(event: any) {
    console.log('event', event.value)
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe({
      next: (result: any) => {
        console.log('The dialog was closed ' + result);
      },
      error: (err: any) => console.log(err)
    });
  }
}
