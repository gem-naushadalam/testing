import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormsService } from 'src/app/services/forms/forms.service';
import { UploadFormComponent } from '../upload-form/upload-form.component';
import {saveAs} from 'file-saver';
// import {FileValidator} from 'ngx-material-file-input';
@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.scss']
})
export class ViewFormComponent implements OnInit {


  public FormsData: any = [];
  isHr: boolean = true;  
  searchText : string ='';
  dataSource = new MatTableDataSource(this.FormsData);
  departments:any = ["Investment Declaration","Accounts","HR"]
  blob!: Blob;
  constructor( private forms: FormsService,) { }

  ngOnInit(): void {
    this.forms.getForms(this.isHr).subscribe(
      (data:any) => {
        this.FormsData = data.object;
        // console.log(this.FormsData);

      }
    )

  

  }

  downloadFile(id:any){
    let params = new HttpParams();
    params = params.set('formId',id);
    params = params.set('isDownloaded', 'true')
  

    this.forms.downloadFile(params).subscribe(Blob =>{
      
      let dataType = typeof(Blob);
      console.log(Blob);
      saveAs(Blob, 'download.pdf');  
  

  });
}
}





