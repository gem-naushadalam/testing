import { HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import { SharedService } from '../../sharedservice.service';

@Component({
  selector: 'app-add-new-industry',
  templateUrl: './add-new-industry.component.html',
  styleUrls: ['./add-new-industry.component.scss']
})
export class AddNewIndustryComponent implements OnInit,OnChanges {
  check!: boolean;

  constructor(public fb:FormBuilder, public projectservice: ProjectModuleService,
    public router:Router, public toastrServiceService: ToastrServiceService,private activatedRoute: ActivatedRoute, public shared:SharedService) { }
  addIndustry!: FormGroup;
  ngOnInit(): void {
    this.addIndustry = this.fb.group({
      industryName: new FormControl('',Validators.required),
      description : new FormControl('',Validators.required)

    });
    this.check = this.shared.ifVertical;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.check =  this.shared.ifVertical;
     
   }
  onSubmitIndustry(){
    console.log(this.addIndustry.value);
    let params = new HttpParams();
    params = params.set('currentId', '1');
    params = params.set('industryTypeDescription', this.addIndustry.get('description')?.value);
    params = params.set('industryTypeName', this.addIndustry.get('industryName')?.value);
    var route = this.activatedRoute.snapshot.params.type;
    
    this.projectservice.addNewIndustry(params).subscribe((data) => {
      this.toastrServiceService.showSuccess(
        'Industry Added Successfully !!'
      );
      this.reset();
      if(!this.check){
        this.router.navigate([`project-management`])
      }
      else{
        this.router.navigate([`project-management/${route}/add-new-project`])
       
      }
    })


  }
  reset(){
    this.addIndustry.reset();
    this.addIndustry.controls.controlName?.clearValidators();
    this.addIndustry.controls.controlName?.updateValueAndValidity();

  }

}
