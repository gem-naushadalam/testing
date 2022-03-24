import { Injectable, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/modules/@feature/forms-and-policy/dialog/dialog.component';
import { ApproverDialogComponent } from 'src/app/modules/@shared/approver-dialog/approver-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dailog: MatDialog) {}
@Input() data:any;
  openConfirmDialog(msg: any) {
    return this.dailog.open(DialogComponent, {
      width: '500px',

      disableClose: true,
      data: {
        message: msg
      },
    });
  }
  openConfirmApproverDialog(msg:any){
    return this.dailog.open(ApproverDialogComponent,{
      width:'500px',
      disableClose:true,
      data:{
        message:msg,
      },
    });
  }
}
