import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {
  forms:any = ["Investment Declaration","Accounts","HR"]
  fileName = " No file Chosen";
  formTitle:string='';
  departmentType:string ='';
  fileToUpload: File | null = null;

  uploadForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }
  onChange(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fileName = event.target.files[0].name;
      // this.uploadForm.get('file').setValue(file);
    }
  }
  // onSubmit() {
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('file').value);

  //   this.httpClient.post<any>(, formData).subscribe(
  //     (res) => console.log(res),
  //     (err) => console.log(err)
  //   );
  // }
     

}
