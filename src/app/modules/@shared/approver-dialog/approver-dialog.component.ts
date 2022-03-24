import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approver-dialog',
  templateUrl: './approver-dialog.component.html',
  styleUrls: ['./approver-dialog.component.scss']
})
export class ApproverDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  public dialogRef: MatDialogRef<ApproverDialogComponent>,public fb:FormBuilder) { }
   submitRemarks!:FormGroup;

   ngOnInit(): void {
    this.submitRemarks = this.fb.group({
      remarks: new FormControl()
    })
  }
  closeDialog() {
    let ans = this.submitRemarks.get('remarks')?.value;
    this.dialogRef.close({action:1, data:ans});
   
  }
  onNoClick(){
    this.dialogRef.close({action:0});
  }

}
