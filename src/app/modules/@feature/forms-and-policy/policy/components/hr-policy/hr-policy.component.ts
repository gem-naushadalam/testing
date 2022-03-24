import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import { MatDialog } from '@angular/material/dialog';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Policy {
  position: number;
  type: string;
}

@Component({
  selector: 'app-hr-policy',
  templateUrl: './hr-policy.component.html',
  styleUrls: ['./hr-policy.component.scss'],
})
export class HrPolicyComponent implements OnInit {
  displayedColumns: string[] = ['position', 'type', 'actions', 'status'];
  dataSource = new MatTableDataSource();
  user: boolean = false;
  show: boolean = true;
  fileName = ' No file Chosen';
  policyName!: String;
  policyFile!: File;
  isHr: boolean = false;
  currentId: Number = 1;
  resData: any;
  uploadPolicy!: FormGroup;
  url!: any;
  error: any;
  errorFlag : boolean = true;

  constructor(
    private policyService: PolicyService,
    private formBuilder: FormBuilder,
    private toastrServiceService: ToastrServiceService,
    public dialogservice: DialogService,
    public dialog: MatDialog,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.uploadPolicy = this.formBuilder.group({
      policyFile: [''],
      policyName: [''],
    });
    this.getPolicy();
  }

  // Getting all policies
  public getPolicy() {
    this.errorFlag = true;
    this.policyService.getPolicies(this.isHr).subscribe((data: any) => {
      this.dataSource.data = data.object;
      this.dataSource.data.forEach((data: any) => {
        data['isEdit'] = false;
      });
      // console.log(this.dataSource.data);
    }, (error: any) => {
      this.errorFlag = false;
      this.error = error;
      console.log(error, "I am in policy")
    });
  }

  // Clicking on browse and change the name of file in the input with corresponding file
  public onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.uploadPolicy.get('policyFile')?.setValue(file);
    }
  }

  // Adding a policy when clicking on Submit button
  public onSubmit() {
    let formData: FormData = new FormData();
    formData.append('file', this.uploadPolicy.get('policyFile')?.value);

    let params = new HttpParams();
    params = params.set('currentId', '1');
    params = params.set(
      'policyName',
      this.uploadPolicy.get('policyName')?.value
    );
    this.policyService.addPolicy(formData, params).subscribe(
      (data) => {
        console.log('success');
        this.toastrServiceService.showSuccess('Policy Added Successfully !!');
        this.Close();
        this.getPolicy();
      },
      (error) => console.log(error)
    );
  }

  // Search a particular policy with policyName
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // Change the policy status to true or false for the user
  public onChangeStatus(id: any) {
    this.dialogservice
      .openConfirmDialog(
        'Are you sure you want to update the status of this policy?'
      )
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          console.log('......................................', id);
          let params = new HttpParams();
          params = params.set('currentId', '1');
          params = params.set('policyId', id);

          this.policyService.patchstate(params).subscribe(
            (data) => {
              this.getPolicy();
              this.toastrServiceService.showSuccess(
                'Status Changed Successfully !!'
              );
            },

            (error) => console.log(error)
          );
        } else {
          this.getPolicy();
        }
      });
  }

  // Delete a particular Policy
  public onDelete(id: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to delete this policy?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          console.log('......................................', id);

          let params = new HttpParams();
          params = params.set('currentId', '1');
          params = params.set('policyId', id);

          this.policyService.deleteform(params).subscribe(
            (data) => {
              this.getPolicy(),
                this.toastrServiceService.showSuccess(
                  'Policy Deleted Successfully !!'
                );
            },
            (error) => console.log(error)
          );
        }
      });
  }

  public onPolicyNameUpdate(data: any) {
    console.log(data);

    let params = new HttpParams();
    params = params.set('currentId', '1');
    params = params.set('policyId', data.policyId);
    params = params.set('policyName', data.policyName);

    this.policyService.updatePolicyName(params).subscribe((res) => {
      console.log(res);
      this.close(data);
      this.toastrServiceService.showSuccess(
        'Policy Name Updated Successfully !!'
      );
    });
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
  viewPolicy(id: any) {
    let params = new HttpParams();
    params = params.set('policyId', id);

    // let tab = window.open();
    this.policyService.getPolicyPdf(params).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      console.log(blob);
      var Fileurl = URL.createObjectURL(blob);
      // tab.location.href = Fileurl;
      this.url = Fileurl;
      // window.open(Fileurl)
      console.log(
        '....................................................................',
        this.url
      );
    });
  }

  public onOpenInput(data: any) {
    data.isEdit = true;
  }

  Upload() {
    this.user = true;
    this.show = false;
  }
  Close() {
    this.user = false;
    this.show = true;
  }

  close(data: any) {
    data.isEdit = false;
  }
}
