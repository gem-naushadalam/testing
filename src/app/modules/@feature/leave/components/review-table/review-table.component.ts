import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { LeaveManagementService } from 'src/app/services/leave/leave-management.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.scss']
})


export class ReviewTableComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() tableData: any;
  @Input() displayedColumns: any;
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  @Output() approved: EventEmitter<any> = new EventEmitter<any>();
  @Output() rejected: EventEmitter<any> = new EventEmitter<any>();
  @Output() bulkApprove: EventEmitter<any> = new EventEmitter<any>();
   model = new FormControl();
   

  @ViewChild(MatSort)
  sort!: MatSort;
  select: boolean = false;
  dataSource = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  employeeName!: string;
  opened: boolean = false;
  events: string[] = [];
  displayedColumnsKeys!: string[];
  filterValues: any = {};
  statusEntries = ['APPLIED', 'APPROVED', 'REJECTED'];
  Data: any;
  form = new FormGroup({
    filter: new FormControl(),
    status: new FormControl()
  });
  view: any;
  values: any = [];

  constructor(public leaveservice: LeaveManagementService, public empservice: EmployeeDirectoryService, public router: Router) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.view = this.tableData?.slice(0, 20);
    this.dataSource.data = this.view;
    this.displayedColumnsKeys = this.displayedColumns.map((col: any) => col.key);

  }
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<any>(this.tableData);
    this.displayedColumnsKeys = this.displayedColumns.map((col: any) => col.key);
    for (var key in this.tableData) {
      this.getEmployeeName(this.tableData[key].userId, key);
    }
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

    this.dataSource.filterPredicate = this.customFilterPredicate();

    this.form.valueChanges.subscribe(res => {
      this.dataSource.filter = JSON.stringify(res);
    });
    console.log(changes);
    if ((changes.tableData.currentValue != changes.tableData.previousValue)) {
      this.change(this.statusEntries, 'status', 'APPLIED', true);
    }
    this.select = true;

  }
  ngAfterViewInit() {

  }
  bulkapprove() {
    this.bulkApprove.emit(this.selection);

  }
  getEmployeeName(userId: any, key: any) {
    let result;
    this.empservice.getEmployeeDetailsByuserId(userId).subscribe((data: any) => {
      result = data.object.employeeName;
      this.tableData[key] = Object.assign({ name: result }, this.tableData[key]);
      this.dataSource.data = this.tableData;
    })
  }

  isChecked(field: string, value: string) {
    const control = this.form.get(field);
    return control && control.value && control.value.indexOf(value) >= 0;
  }
  approve(element: any) {
    this.approved.emit({ element });
  }
  reject(element: any) {
    this.rejected.emit({ element });
  }

  customFilterPredicate() {
    return (
      data: any = this.tableData,
      filter: string
    ) => {
      const obj = JSON.parse(filter);
      let find: boolean = !obj.filter && !obj.status;
      if (obj.filter) {
        const value =
          '~' +
          data.status +
          '~' +
          data.name +
          '~';
        find = value.toLowerCase().indexOf(obj.filter.toLowerCase()) >= 0;
      } else find = true;

      if (obj.status) find = find && obj.status.indexOf(data.status) >= 0;
      return find;
    };

  }


  change(list: any[], field: string, value: string, isChecked: boolean) {
    this.selection.clear();
    const control = this.form.get(field);
    const oldValue = control ? control.value || [] : [];
    if (control) {
      if (!isChecked) {

        const newValue = oldValue.filter((x: string) => x != value);
        control.setValue(newValue.length > 0 ? newValue : null);
      } else {
        const newValue = list.filter(
          x => oldValue.indexOf(x) >= 0 || x == value
        );
        control.setValue(newValue);
      }
    }

    if ((this.form.value.status == "APPLIED")) {
      if (!(this.displayedColumns[0].key == "select")) {
        this.displayedColumns.unshift({
          key: 'select',
          header: ''
        })
        this.displayedColumnsKeys = this.displayedColumns.map((col: any) => col.key);
      }
    }
    else {
      if (this.displayedColumns[0].key == "select") {
        this.displayedColumns.shift();
        this.displayedColumnsKeys = this.displayedColumns.map((col: any) => col.key);
      }

    }
  }

  isCheckedd(): boolean {
    return (
      this.model.value &&
      this.values.length &&
      this.model.value.length === this.values.length
    );
  }

  isIndeterminate(): boolean {
    return (
      this.model.value &&
      this.values.length &&
      this.model.value.length &&
      this.model.value.length < this.values.length
    );
  }

  toggleSelection(change: MatCheckboxChange) {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }

  toggleSidenav(): void {
    this.sidenav.toggle();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.filteredData.forEach((row: any) => this.selection.select(row));


  }
  onScroll() {
    if (this.view.length < this.tableData.length) {
      let len = this.view.length;
      let length = this.tableData.length;
      let final_length = len + 15;

      if ((this.tableData.length - 1) > (len + 15)) {
        final_length = len + 15
      }
      else {
        final_length = this.tableData.length - 1;
      }
      for (let i = len; i <= final_length; i++) {
        this.view.push(this.tableData[i]);
      }
    }
  }

}
