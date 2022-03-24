import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from "@angular/material/sidenav";

export interface Goals{
  year:string;
  cycle:string;
  goal:string;
  goaltype:string;
  status:string;
  
}

const MyGoal: Goals[] =[
  {
    year:'2018-2019',
    cycle:'April 2019',
    goal:'Learn Design thinking to enchance design process used in the projects.',
    goaltype:'Learning',
    status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

},
{
  year:'2018-2019',
  cycle:'April 2019',
  goal:'Learn Design thinking to enchance design process used in the projects.',
  goaltype:'Learning',

  status:'APPROVED'

}
]
 
export interface CandidateAppliedFilter {
  filterName: string;
  filterValue: string;
}

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})

export class GoalsComponent implements OnInit {

  displayedColumns: string[] = [
    'select',
    'year',
    'cycle',
    'goaltype',   
    'goal',    
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<Goals>(MyGoal);
  goals:any = [ "A",'B','C'];
  show : boolean = true;
  Goals :boolean = false;
  opened: boolean = false;
  events: string[] = [];
  selectedYear!: number;
  years: number[] = [];  

  openFilter = false;
  selection = new SelectionModel<Goals>(true, []);
  startDate = new Date(1990, 0, 1);
  status:any = ['Approved','Submitted','Drafted']
  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  form=new FormGroup({
    Year:new FormControl(),
    StartDate:new FormControl()
  })
  data = [1];  
  onAddData() {
 this.data.push(this.data.length);
 }
 constructor(){
 this.selectedYear = new Date().getFullYear();
 for (let year = this.selectedYear; year >= 2010; year--) {
   this.years.push(year);
 }
}
 Upload() {
   this.show = false;
   this.Goals = true;
 }
 Draft()
 {
   this.show= true;
   this.Goals = false;
 }
 isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
toggleSidenav(): void {
  this.sidenav.toggle();
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}




  ngOnInit(): void {
  }

}
