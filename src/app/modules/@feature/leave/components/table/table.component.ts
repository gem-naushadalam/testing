import {
  Component,
  ViewChild,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, OnInit {
  @Input() tableData: any;
  @Input() displayedColumns: any;
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort)
  sort!: MatSort;
  @Output() action: EventEmitter<any> = new EventEmitter<any>();
  displayedColumnsKeys!: string[];
  view: any;

  constructor(public leaveservice: LeaveManagementService) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    // this.view = this.tableData.slice(0,20);
    this.dataSource.data = this.tableData;
    this.displayedColumnsKeys = this.displayedColumns.map(
      (col: any) => col.key
    );
    // this.dataSource.sort= this.sort;
  }
  ngOnChanges() {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.view = this.tableData?.slice(0, 20);
    this.dataSource.data = this.view;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'period':
          return item.fromDate;
        case 'date':
          return item.date;
        default:
          return 0;
      }
    };
  }
  delete(element: any) {
    this.action.emit({ element });
  }
  onScroll() {
    if (this.view.length < this.tableData.length) {
      let len = this.view.length;
      let length = this.tableData.length;
      let final_length = len + 15;

      if (this.tableData.length - 1 > len + 15) {
        final_length = len + 15;
      } else {
        final_length = this.tableData.length - 1;
      }
      for (let i = len; i <= final_length; i++) {
        this.view.push(this.tableData[i]);
      }
    }
  }
}
