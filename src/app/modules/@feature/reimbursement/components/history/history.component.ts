import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReimbursementService } from 'src/app/services/reimbursement/reimbursement.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  dataSource = new MatTableDataSource();
  formName!: string;
  displayedColumns: string[] = [
    'position',
    'category',
    'date',
    'amount',
    'reimbursement',
    'comments',
    'status',
    'actions'

  ];
  url !: string;
  constructor(
    public reimbursementService : ReimbursementService,
    public toastrServiceService: ToastrServiceService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.reimbursementService.getForm().subscribe((data : any)=>{
       this.dataSource.data=data.object;
    })
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  viewFile(id: any) {
    let params = new HttpParams();
    params = params.set('reimbursementId', id);
    params = params.set('isDownload', 'false');

    // let tab = window.open();
    this.reimbursementService.viewFile(params).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      console.log(blob);
      var Fileurl = URL.createObjectURL(blob);
      this.url = Fileurl;
    });
  }

}
