import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faKissBeam } from '@fortawesome/free-solid-svg-icons';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-add-new-vertical',
  templateUrl: './add-new-vertical.component.html',
  styleUrls: ['./add-new-vertical.component.scss']
})
export class AddNewVerticalComponent implements OnInit {
  suggestions: any = [];
  showDiv: boolean = false;
  addVertical!: FormGroup;
  divshow : boolean = false;
  searchWrapper = document.querySelector(".search-input");
  emptyArray: any = [];
  ownerId : any;
  constructor(public empService: EmployeeDirectoryService,private formbuilder:FormBuilder, public projectService:ProjectModuleService, public toastrServiceService:ToastrServiceService, public router:Router) {
       this.empService.getEmployeeDetails().subscribe((data:any) => {
          this.suggestions = data.object;
       });
  }

  ngOnInit(): void { 
    this.addVertical = this.formbuilder.group({
      verticalName:new FormControl('',Validators.required),
      ownerName :new FormControl('',Validators.required),
      description:new FormControl('',Validators.required)
    })
  }
  onOwnerSelection(data: any) {
    this.addVertical.controls['ownerName']?.setValue(data.employeeName);
    this.emptyArray = [];
    this.ownerId = data.empId;

  }
  call(event: any) {
    let userData = event.target.value;
    if (userData) {
      this.emptyArray = this.suggestions.filter((data: any) => {
        return data.email.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      this.searchWrapper?.classList.add("active");
    } else {
      this.emptyArray = [];
      this.searchWrapper?.classList.remove("active");
    }
  }
  reset(){
    this.addVertical.reset();
    this.addVertical.get('ownerName')?.setValue('');
    this.addVertical.controls.controlName?.clearValidators();
    this.addVertical.controls.controlName?.updateValueAndValidity();

  }
  hide(event : any){
    console.log(event);
    if(!this.divshow)
    this.showDiv = false;
  }
  show(event : any){
    console.log(event);
    this.showDiv = true;
  }
  divShow(){
      this.divshow = true;
  }
  divHide(){
    this.divshow = false;
  }
  onSubmit(){
  const dto  = {
    currentId : 1,
    description : this.addVertical.get('description')?.value,
    ownerId : this.ownerId,
    verticalName: this.addVertical.get('verticalName')?.value
  }

    this.projectService.addVertical(dto).subscribe((data)=>{
        console.log(data);
        this.toastrServiceService.showSuccess(
          'Vertical Added Successfully !!'
        );
        this.reset();
        this.router.navigate(['project-management']);
    },
    (error) => {
      this.toastrServiceService.showError(error.error.object, 'Error');
      this.reset();
    }
    )
  }
}
