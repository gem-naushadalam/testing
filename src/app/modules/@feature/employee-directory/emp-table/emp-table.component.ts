import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { EmployeeDirectoryService } from '../../../../services/employee-directory/employee-directory.service';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { MyFilter } from 'src/assets/interface/employee-directory/my-filter-interface.module';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.scss'],
})
export class EmpTableComponent implements OnInit, AfterViewInit {
  table = true;
  card = false;
  isLoading = true;
  tabletoggle = true;
  cardtoggle = false;
  collectionSize!: number;
  i: number = 0;
  dataSource: any =
    new MatTableDataSource([]);
  departmentFilter = new FormControl();
  nameFilter = new FormControl();
  filteredValues: MyFilter = {
    departmentName: [],
    designationName: '',
    employeeName: '',
    email: '',
    contactNo: '',
    extensionNo: '',
    location: '',
  };
  departments: any;
  tableData: any[] = [];
  @ViewChild(MatSelect) matSelect!: MatSelect;
  @ViewChild(MatSort) sort!: MatSort;
  obs!: Observable<any>;
  dataLength: number = 0;
  displayedColumns: string[] = [
    'name',
    'department',
    'email',
    'mobileno',
    'extension',
    'location',
  ];
  start: number = 0;
  limit: number = 15;
  end: number = this.limit + this.start;
  page: number = 1;
  view: any;
colors:any =[
  '#EB7181',
  '#468547',
  '#FFD558',
  '#3670B2'
]
circleColor!:string;
initials:any;
loading: boolean = false;



  constructor(private emp_data: EmployeeDirectoryService) { }

  ngOnInit() {
    this.obs = this.dataSource.connect();
    this.getUserData();
    this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'name':
          return item.employeeName;
        case 'department':
          return item.departmentName;
        case 'location':
          return item.officeLocation;
        default:
          return 0;
      }
    }

    const randomIndex = Math.floor(Math.random() * Math.floor(this.colors.length));
    this.circleColor = this.colors[randomIndex];

    this.nameFilter.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((nameFilterValue) => {
      this.filteredValues['employeeName'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.onSearchValueChange();
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }
  onClear(){
    this.nameFilter.setValue('');

  }

  getUserData() {
    this.emp_data.getEmployeeDetails().subscribe((data: any) => {
      this.tableData = data.object;
      this.getLength(data);
      this.view = data.object.slice(0, 20);
      this.dataSource.data = this.view;
      this.dataSource.sort = this.sort;
      this.loading = false;
    })

  }
  getLength(table: any) {
    this.dataLength = table.object.length;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onSearchValueChange() {
    this.dataSource.data = this.tableData;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    this.collectionSize = this.dataSource.filteredData.length;
    this.dataSource.data = this.dataSource.filteredData;
  }

  customFilterPredicate() {
    return (data: any = this.tableData, filter: string): boolean => {
      let searchString = JSON.parse(filter) as MyFilter;
      return (
        (data.employeeName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.employeeName.toLowerCase()) !== -1 || data.designationName.toString().trim().toLowerCase().indexOf(searchString.employeeName.toLowerCase()) != -1 || data.extensionNo.toString().trim().toLowerCase().indexOf(searchString.employeeName.toLowerCase()) != -1 || data.contactNo.toString().trim().toLowerCase().indexOf(searchString.employeeName.toLowerCase()) != -1 || data.departmentName.toString().trim().toLowerCase().indexOf(searchString.employeeName.toLowerCase()) != -1 || data.officeLocation.toString().trim().toLowerCase().indexOf(searchString.employeeName.toLowerCase()) != -1)
      );
    };
  }
  tableclicked() {
    this.table = true;
    this.card = false;
    this.tabletoggle = true;
    this.cardtoggle = false;
  }
  cardclicked() {
    this.table = false;
    this.card = true;
    this.cardtoggle = true;
    this.tabletoggle = false;
  }
  populate( n : any){
    if (this.view.length < this.tableData.length) {
      let final_length = this.view.length + 10;
      if ((this.tableData.length - 1) > (this.view.length + 10)) {
        final_length = this.view.length + 10
      }
      else {
        final_length = this.tableData.length - 1;
      }
      for (let i = this.view.length; i <= final_length; i++) {
        this.view.push(this.tableData[i]);
      }
    }

    if (
      this.filteredValues.employeeName.length > 0 ||
      this.filteredValues.departmentName.length > 0
    ) {
      this.obs = this.dataSource.connect();
    }
    else
      this.dataSource.data = this.view;

  }
  onScroll() {
    if (((window.innerHeight + window.scrollY + 1) >= document.body.offsetHeight) || ((window.innerHeight + document.documentElement.scrollTop) >= document.body.offsetHeight)) {
      this.populate(10);
  }

  }
}
