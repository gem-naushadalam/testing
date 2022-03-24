import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormsService } from 'src/app/services/forms/forms.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
// import { DialogComponent } from '../../dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import { ThrowStmt } from '@angular/compiler';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Forms {
  position: number;
  type: string;
  form: string;
  upload: string;
  status: string;
}

// ];

@Component({
  selector: 'app-hr-viewform',
  templateUrl: './hr-viewform.component.html',
  styleUrls: ['./hr-viewform.component.scss'],
})
export class HrViewformComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'type',
    // 'form',
    'upload',
    'actions',
    'status',
  ];
  dataSource = new MatTableDataSource();
  user: boolean = false;
  show: boolean = true;
  fileName = ' No file Chosen';
  formName!: string;
  formFile!: File;
  isHr: boolean = false;
  formTitle: string = '';
  file!: File;
  resData: any;
  uploadForm!: FormGroup;
  url: any;
  error: any;
  errorFlag : boolean = true;

  isHideReceipt: boolean = false;
  fileUpload: any;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    public forms: FormsService,
    public dialogservice: DialogService,
    public toastrServiceService: ToastrServiceService,
    private modalService: NgbModal
  ) {}

  @ViewChild('fileUpload') myInputVariable: any;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: [''],
      formName: [''],
    });
    this.getforms();
  }
  getforms() {
    this.errorFlag = true;
    this.forms.getForms(this.isHr).subscribe((data: any) => {
      this.dataSource.data = data.object;
      this.dataSource.data.forEach((data: any) => {
        data['isEdit'] = false;
      });
    
    }, (error: any) => {
      this.errorFlag = false;
      this.error = error;
      console.log(error, "I am in forms")
    })
  }
  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      this.uploadForm.get('file')?.setValue(file);
    }
  }

  onSubmit() {
    let formData: FormData = new FormData();
    formData.append('formFile', this.uploadForm.get('file')?.value);

    let params = new HttpParams();
    params = params.set('currentId', '1');
    params = params.set('formName', this.uploadForm.get('formName')?.value);
    this.forms.postform(formData, params).subscribe(
      (data) => {
        this.getforms();

        this.uploadForm.reset();
        this.Close();
        this.toastrServiceService.showSuccess('Form Added Successfully !!');
      },
      (error) => console.log(error)
    );
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  changeStatus(id: any) {
    this.dialogservice
      .openConfirmDialog(
        'Are you sure you want to update the status of this form?'
      )
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          let params = new HttpParams();
          params = params.set('currentId', '1');
          params = params.set('formId', id);

          this.forms.patchstate(params).subscribe(
            (data) => {
              this.getforms();
              this.toastrServiceService.showSuccess(
                'Status Changed Successfully !!'
              );
            },

            (error) => console.log(error)
          );
        } else {
          this.getforms();
        }
      });
  }

  delete(id: any) {
    this.dialogservice
      .openConfirmDialog('Are you sure you want to delete this form?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          let params = new HttpParams();
          params = params.set('currentId', '1');
          params = params.set('formId', id);
          this.forms.deleteform(params).subscribe(
            (data) => {
              this.getforms();
              this.toastrServiceService.showSuccess(
                'Form Deleted Successfully !!'
              );
            },
            (error) => console.log(error)
          );
        }
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
  viewFile(id: any) {
    this.isHideReceipt = !this.isHideReceipt;
    let params = new HttpParams();
    params = params.set('formId', id);
    params = params.set('isDownloaded', 'false');

    // let tab = window.open();
    this.forms.viewFile(params).subscribe((data) => {
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
  public formNameUpdate(data: any) {
    console.log(data);

    let params = new HttpParams();
    params = params.set('currentId', '1');
    params = params.set('formId', data.formId);
    params = params.set('formName', data.formName);

    this.forms.updateFormName(params).subscribe((res) => {
      console.log(res);
      this.close(data);
      this.toastrServiceService.showSuccess(
        'Form Name Updated Successfully !!'
      );
    });
  }
  public onOpenInput(data: any) {
    data.isEdit = true;
  }
  edit(element: any) {
    this.Upload();
    console.log(element);
  }
  Upload() {
    this.user = true;
    this.show = false;
    this.uploadForm.reset();
    // this.myInputVariable.nativeElement = null;
  }
  Close() {
    this.user = false;
    this.show = true;
    // this.myInputVariable.nativeElement.value = '';
  }

  close(data: any) {
    data.isEdit = false;
  }
}
