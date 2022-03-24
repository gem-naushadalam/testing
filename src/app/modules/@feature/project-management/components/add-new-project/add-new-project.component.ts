import { DatePipe } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import { SharedService } from '../../sharedservice.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit,OnChanges {
  data: any = [];
  suggestions: any = [];
  ownerDiv:boolean = false;
  addProject!: FormGroup;
  searchWrapper = document.querySelector(".search-input");
  emptyArray: any = [];
  ownerId: any;
  roles: any;
  tasks: any;
  industries:any;
  memberId: any = [];
  emptyOwnerArray: any;
  memberDiv: any = [];
  divshow: boolean = false;
  check: boolean;
  constructor(public formBuilder: FormBuilder, public empService: EmployeeDirectoryService, 
    public project: ProjectModuleService, public datePipe:DatePipe,private activatedRoute: ActivatedRoute,
     public toastrServiceService:ToastrServiceService, public router:Router, public shared:SharedService) {
    this.empService.getEmployeeDetails().subscribe((data: any) => {
      this.suggestions = data.object;
    });
    this.check = this.shared.ifVertical;


  }

  ngOnInit(): void {
    this.getAllTask();
    this.getroles();
    this.getAllIndustries();
    this.addProject = this.formBuilder.group({
      projectName:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      industryName:new FormControl('',Validators.required),
      ownerName:new FormControl('',Validators.required),
      members: this.formBuilder.array([ ])

    })

  }
  ngOnChanges(changes: SimpleChanges): void {
   this.check =  this.shared.ifVertical;
    
  }
  onMemberSelection(data: any, index:any) {
    (this.addProject.get('members') as FormArray).controls[index].get('name')?.setValue(data.employeeName);

    this.emptyArray[index] = [];
    this.memberId[index] = data.empId;

  }
  remove(index:any){
    this.items.removeAt(this.items.value[index]);
  }
  onOwnerSelection(data: any){
    this.addProject.controls['ownerName'].setValue(data.employeeName);
    this.emptyOwnerArray =[];
     this.ownerId = data.empId;
  }
  call(event: any, index:number) {
    let userData = event.target.value;
    if (userData) {
      this.emptyArray[index] = this.suggestions.filter((data: any) => {
        return data.email.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      this.searchWrapper?.classList.add("active");
    } else {
      this.emptyArray[index]= [];
      this.searchWrapper?.classList.remove("active");
    }
  }
  divShow(){
    this.divshow = true;
}
divHide(){
  this.divshow = false;
}
  ownercall(event: any) {
    let userData = event.target.value;
    if (userData) {
      this.emptyOwnerArray = this.suggestions.filter((data: any) => {
        return data.email.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
      });
      this.searchWrapper?.classList.add("active");
    } else {
      this.emptyOwnerArray = [];
      this.searchWrapper?.classList.remove("active");
    }
  }
  getroles() {
    this.project.getAllRoles().subscribe((data: any) => {
      this.roles = data.object;
    });
  }
  hide(event : any){
    if(!this.divshow)
    this.ownerDiv = false;
  }
  show(event : any){
    this.ownerDiv = true;
  }
  hideMember(event:any, index:any){
    this.memberDiv[index] = false;
  }
  showMember(event:any, index:any){
    this.memberDiv[index] = true;
  }

  getAllTask() {
    this.project.getAllTasks().subscribe((data: any) => {
      this.tasks = data.object;
    });
  }
  getAllIndustries(){
    this.project.getAllIndustries().subscribe((data:any) => {
     this.industries = data.object;
    })
  }
  onSubmitMember() {
    const dto_member: {
      allocatedFrom: string; allocatedTill: string; bandWidth: number; currentId: any;
      reportingManagerId: any;roleTypeId: any; shadow: any; taskId: any; userId: any;
    }[] = [];
    this.addProject.value.members.forEach((element:any, index:any) => {
      const dto_obj = {
        allocatedFrom:this.datePipe.transform(element.startDate,'YYYY-MM-dd') as string,
        allocatedTill:this.datePipe.transform(element.endDate,'YYYY-MM-dd') as string,
        bandWidth: element.bandwidth,
        currentId: 1,
        reportingManagerId:1,
        roleTypeId: element.role,
        shadow: element.shadow,
        taskId: element.task,
        userId: this.memberId[index]
            }
        dto_member.push(dto_obj);
      
    });
    const dto = {
    currentId: 1,
    description : this.addProject.get('description')?.value,
    projectName : this.addProject.get('projectName')?.value,
    projectOwnerId: this.ownerId,
    projectTeamMembers:dto_member,
    status:'STARTED'  
    }
    const industryId = this.addProject.get('industryName')?.value;
    var route = this.activatedRoute.snapshot.params.type;
    var arr = route.split('@');
    const verticalId = arr[0];
    this.project.addNewProject(dto, industryId,verticalId).subscribe((data:any)=>{
        this.toastrServiceService.showSuccess(
          'Project Added Successfully !!'
        );
        this.reset();
        this.data = [];
        console.log(data);
        this.router.navigate([`project-management/${route}`])


    },
    (error) => {
      this.toastrServiceService.showError(error.error.object, 'Error');
      this.reset();
    }
    )

  }
  get items(){
    return this.addProject.get('members') as FormArray;
  }
  reset(){
    this.addProject.reset();
    this.addProject.get('ownerName')?.setValue('');
    this.addProject.controls.controlName?.clearValidators();
    this.addProject.controls.controlName?.updateValueAndValidity();
  }
  onAddData() {
    this.data.push(1);

    const newItem = this.formBuilder.group({
      
     
      name: new FormControl('',Validators.required),
      task:new FormControl('',Validators.required),
      role: new FormControl('',Validators.required),
      startDate: new FormControl('',Validators.required),
      endDate: new FormControl('',Validators.required),
      bandwidth: [''],
      shadow: ['']
    })
    this.items.push(newItem);
  }
}
