import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppraisalService } from 'src/app/services/appraisal/appraisal.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-add-parameters',
  templateUrl: './add-parameters.component.html',
  styleUrls: ['./add-parameters.component.scss']
})
export class AddParametersComponent implements OnInit {

  addParameter!: FormGroup;
  open:boolean = true;

  constructor(public fb:FormBuilder,public appraisalservice:AppraisalService,public toastrServiceService:ToastrServiceService) { }

  ngOnInit(): void {
    this.open = true;
    this.addParameter = this.fb.group({
      competency : new FormControl('',Validators.required),
      parameter : new FormControl('',Validators.required),
      weightage : new FormControl('',Validators.required),


    })
  }
  onPostParameter(){
    console.log(this.addParameter.value);
    let params = new HttpParams();
    params = params.append('competencyType',this.addParameter.get('competency')?.value);
    const body={
      parameterName : this.addParameter.get('parameter')?.value,
      weightage : this.addParameter.get('weightage')?.value

    }
    
   this.appraisalservice.postParameter(params,body).subscribe(()=>{
     console.log('success');
     this.addParameter.reset();
     this.toastrServiceService.showSuccess(
      'Parameter Added Successfully !!'
    );
    this.close();


   })
    
  }
  close(){
    this.open = false;
  }

}
