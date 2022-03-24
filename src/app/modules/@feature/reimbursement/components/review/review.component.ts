import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { ReimbursementService } from 'src/app/services/reimbursement/reimbursement.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'position',
    'gemId',
    'name',
    'category',
    'date',
    'reimbursement',
    'comments',
    'actions'

  ];
  cards: any;
  constructor(
    public reimbursementService : ReimbursementService,
    public empservice:EmployeeDirectoryService
  ) { }

  ngOnInit(): void {
    this.reimbursementService.getFormsforApproverId().subscribe((data : any)=>{
      this.cards = data.object;
      this.cards.forEach((service : any, key:any) => {
        this.getEmployeeName(key,service);

    })
   })
  }
  getEmployeeName(key: any, dataObject:any) {
    let empName;
    let gemId;

    this.empservice
      .getEmployeeDetailsByuserId(dataObject.userId)
      .subscribe((data: any) => {
        empName = data.object.employeeName;
        gemId = data.object.employeeCode;
        this.cards[key] = Object.assign(
          { empName, gemId },
          this.cards[key]
        );
        this.dataSource.data = this.cards;
      });
  }
  downloadFile(id:any, name:any){
    let params = new HttpParams();
    params = params.set('reimbursementId',id);
    params = params.set('isDownload', 'true')
  

    this.reimbursementService.viewFile(params).subscribe(Blob =>{      
      let dataType = typeof(Blob);
      console.log(Blob);
      saveAs(Blob, name);  

  });
}

}
