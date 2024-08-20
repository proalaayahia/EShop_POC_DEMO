import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableButtonAction } from '../../models/tableButtonAction';
import { TableColumn } from '../../models/tableColumn';
import { Observable, Subscription } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CdkTableModule } from '@angular/cdk/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableActionDirective } from './directives/table-action.directive';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

@Component({
  selector: 'app-mat-custom-table',
  standalone:true,
  imports:[MatProgressSpinnerModule,
    MatFormFieldModule,MatIconModule,FormsModule,
    CommonModule, MatTableModule,
    MatButtonModule,
    MatIconModule,
    CdkTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatInputModule,
    MatSortModule,TableActionDirective, ActionButtonsComponent],
  templateUrl: './mat-custom-table.component.html',
  styleUrls: ['./mat-custom-table.component.css'],
  // animations: [showAnimation]
})
export class MatCustomTableComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>()
  @Input() columns: Array<TableColumn> = [];
  @Input() dataset!: Observable<Array<any>>
  @Input() component: string = ''
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = [];
  value!: string;
  subscription!: Subscription
  isLoading: boolean = false
  constructor() { }


  ngOnInit() {
    // set checkbox column
    this.displayedColumns.push("select");

    // set table columns
    this.displayedColumns = this.displayedColumns.concat(this.columns.map(x => x.columnDef));    // pre-fix static

    // add action column
    this.displayedColumns.push("action");
    this.subscription = this.dataset.subscribe({
      next: (res: any) => {
        //set data source
        this.dataSource = new MatTableDataSource<any>(res)
        // set pagination
        this.dataSource.paginator = this.paginator;
        //set sort
        this.dataSource.sort = this.sort;
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }

  onTableAction(e: TableButtonAction): void {
    this.action.emit(e)
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected?.length;
    const numRows = this.dataSource.data?.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
