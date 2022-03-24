import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppraisalService } from 'src/app/services/appraisal/appraisal.service';

@Component({
  selector: 'app-create-appraisal-cycle',
  templateUrl: './create-appraisal-cycle.component.html',
  styleUrls: ['./create-appraisal-cycle.component.scss']
})
export class CreateAppraisalCycleComponent implements OnInit {

  createCycle!:FormGroup;
  open:boolean = true;

  constructor(public fb:FormBuilder , public appraisalservice:AppraisalService) { }

  ngOnInit(): void {
    this.open = true;
    // console.log(countries);
    // const countryCodes = Object.keys(countries);
    // console.log(countryCodes);
    // const countryNames = countryCodes.map((code:any) => countries[code].name)
// const countryNames = countryCodes.map(code => countries[code].name);
// console.log(countryNames);

this.createCycle = this.fb.group({
  country : new FormControl('',Validators.required),
  year : new FormControl('',Validators.required),
  month: new FormControl('',Validators.required)

})
  }
  onPostCycle(){
    console.log(this.createCycle.value);
    let params = new HttpParams();
    params = params.append('country',this.createCycle.get('country')?.value);
    params = params.append('month',this.createCycle.get('month')?.value);
    params = params.append('year',this.createCycle.get('year')?.value);

    this.appraisalservice.postCycle(params).subscribe((data)=>{
      console.log('success');
      this.createCycle.reset;

    })


  }
  close(){
    this.open = false;
  }

}
