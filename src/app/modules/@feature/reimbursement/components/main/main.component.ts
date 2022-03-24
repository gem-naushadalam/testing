import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReimbursementService } from 'src/app/services/reimbursement/reimbursement.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public history = true;
  public review = false;
  public invoiceUploadClicked = false;
  public submitForm!:FormGroup;
  fileName = ' No file Chosen';
  constructor(
    public fb:FormBuilder,
    public reimbursementService : ReimbursementService,
    public toastrServiceService: ToastrServiceService
  ) { }

  ngOnInit(): void {
    this.submitForm = this.fb.group({
      file: [''],
      comments:new FormControl('',Validators.required),
      reimbursementAmount:new FormControl('',Validators.required),
      invoiceAmount:new FormControl('',Validators.required),
      invoiceDate:new FormControl('',Validators.required),
      category:new FormControl('',Validators.required)
    })
  }
  OnSubmitForm(){
   console.log(this.submitForm.value);
   let formData: FormData = new FormData();
   formData.append('billFile', this.submitForm.get('file')?.value);
   const userId :any = localStorage.getItem('userId')
   
   let params = new HttpParams();
   params = params.set('approverId', '1');
   params = params.set('amount', this.submitForm.get('reimbursementAmount')?.value);
   params = params.set('category', this.submitForm.get('category')?.value);
   params = params.set('description', this.submitForm.get('comments')?.value);
   params = params.set('status', 'APPLIED');
   params = params.set('userId', userId);



   this.reimbursementService.postform(formData, params).subscribe((data) => {
         this.toastrServiceService.showSuccess(
         'Invoice Uploaded Successfully !!'
         );
           this.reset();
           this.invoiceUploadClicked = false;
   },(error) => {
    this.toastrServiceService.showError(error.error.object, 'Error');
   })
  }
  reset(){
    this.submitForm.reset();
    this.submitForm.controls.controlName?.clearValidators();
    this.submitForm.controls.controlName?.updateValueAndValidity();
  }
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.submitForm.get('file')?.setValue(file);
    }
  }
  invoiceHistory(){
    this.history = true;
    this.review = false;
  }
  reviewHistory(){
    this.history = false;
    this.review = true;
  }
  uploadInvoice(){
    this.invoiceUploadClicked = true;

  }
  Close(){
    this.invoiceUploadClicked = false;
  }

}
