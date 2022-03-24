import { HttpParams } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';
import { FormBuilder } from '@angular/forms';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../sharedservice.service';


export interface PeriodicElement {
  name: string;
  task: string;
  role: string;
  email: string;
  
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnChanges {
  projects: any = [];
  roles: any = [];
  tasks: any = [];
  addRowFlag = false;
  panelOpenState = false;
  displayedColumns: string[] = [
    'name',
    'task',
    'role',
    'allocatedFrom',
    'allocatedTo',
    'bandwidth',
    'shadow',
    'actions',
  ];
  addMemberForm!: FormGroup;
  check:any;
  teamMember: any = [];
  dataSource: any = new MatTableDataSource();
  array: any = [];
  public filteredList: any = [];
  public filteredList1: any = [];
  searchWrapper = document.querySelector('.search-input');
  a = 1;
  emptyArray: any = [];
  suggestions: any;
  data: any = [];
  memberId: any = [];
  projectId!: any;

  constructor(
    public project: ProjectModuleService,
    public dialogservice: DialogService,
    private toastrServiceService: ToastrServiceService,
    public empservice: EmployeeDirectoryService,
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public datePipe: DatePipe,
    public shared :SharedService
  ) {
    this.empservice.getEmployeeDetails().subscribe((data: any) => {
      this.suggestions = data.object;
    });
    console.log(this.shared.ifVertical);
    this.check = this.shared.ifVertical;
  }

  ngOnInit(): void {
    this.getProject();
    this.getroles();
    this.getAllTask();
    this.userDetail();
    this.addMemberForm = this.fb.group({
      members: this.fb.array([]),
      role: [''],
      task: [''],
      endDate: [''],
      bandWidth: [''],
      shadow: [''],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
   console.log(this.shared.ifVertical);
   this.check =  this.shared.ifVertical;
  }
  getProject() {
    let params = new HttpParams();
    var data = this.activatedRoute.snapshot.params.type;
    var arr = data.split('@');
    const verticalId = arr[0];
    if(this.check){
    params = params.set('verticalId', verticalId);
    }
    else
    {
      params = params.set('industryId',verticalId);
    }

    this.project.getProject(params).subscribe((data) => {
      this.projects = data.object;
      this.projects.forEach((project:any, index:any) => {
        this.projectId = project.projectId;
        this.data[index] = [];
         this.getTeamMembers(index,project);
      });
    });
  }
  onMemberSelection(data: any, index: any) {
    (this.addMemberForm.get('members') as FormArray).controls[index]
      .get('name')
      ?.setValue(data.employeeName);
    this.emptyArray[index] = [];

    this.memberId[index] = data.empId;
  }

  call(event: any, index: number) {
    let userData = event.target.value;
    if (userData) {
      this.emptyArray[index] = this.suggestions.filter((data: any) => {
        return data.email
          .toLocaleLowerCase()
          .startsWith(userData.toLocaleLowerCase());
      });
      this.searchWrapper?.classList.add('active');
    } else {
      this.emptyArray[index] = [];
      this.searchWrapper?.classList.remove('active');
    }
  }

  getEmployeeName(userId: any, index: any, ind:any) {
    let name: any;
    let email: any;
    let imgPath: any;
    
    this.empservice.getEmployeeDetailsByuserId(userId).subscribe((d: any) => {
      name = d.object.employeeName;
      email = d.object.email;
      imgPath = d.object.profileImagePath;
      this.array[ind] = [...this.array[ind]].map(
        (d: any, idx: any) => {
          return idx === index ? { ...d, name, email, imgPath } : d;
        }
      );
    });
  }

  getTeamMembers( index:any,project:any) {
    let params = new HttpParams();
    params = params.set('projectId', project.projectId);
    this.project.getTeamMember(params).subscribe((data: any) => {
      this.array[project.projectId]= data.object;
      this.array[project.projectId].forEach((d: any) => {
        d['isEdit'] = false;
        d['flag'] = false;
      });
      this.array[project.projectId].forEach((d: any, idx: any ) => {
        this.getEmployeeName(d.userId, idx , project.projectId);
      });
    });
  }

  public onOpenInput(data: any) {
    data.isEdit = true;
    const tasks = this.tasks.filter(
      (task: any) => task.taskName === data.taskName
    );

    const roles = this.roles.filter(
      (role: any) => role.roleTypeName === data.roleTypeName
    );
    this.addMemberForm.patchValue({
      task: tasks[0].taskId,
      role: roles[0].roleTypeId,
      endDate: data.allocatedTill,
      shadow: data.shadow,
      bandWidth: data.bandWidth,
    });
  }

  public onDelete(id: any, index: any, projectId: any) {
    const currentId: any = localStorage.getItem('userId');
    this.dialogservice
      .openConfirmDialog('Are you sure you want to delete this member?')
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          let params = new HttpParams();
          params = params.set('currentId', '1');
          params = params.set('teamMemberId', id);

          this.project.deleteTeamMember(params).subscribe(
            (data) => {
              this.getTeamMembers(index, projectId),
                this.toastrServiceService.showSuccess(
                  'Team Member Deleted Successfully !!'
                );
            },
            (error) => console.log(error)
          );
        }
      });
  }

  userDetail() {
    this.empservice.getEmployeeDetails().subscribe((data) => {
      this.filteredList = data.object;

      this.filteredList1 = this.filteredList.slice();
    });
  }

  getroles() {
    this.project.getAllRoles().subscribe((data: any) => {
      this.roles = data.object;
    });
  }

  getAllTask() {
    this.project.getAllTasks().subscribe((data: any) => {
      this.tasks = data.object;
    });
  }
  get items() {
    return this.addMemberForm.get('members') as FormArray;
  }

  projectIdFind = (id: any, index:any) => {
    this.projectId = id.projectId;
  };

  onSubmitMember(index : any, project :any) {
    const dto_member: {
      allocatedFrom: string;
      allocatedTill: string;
      bandWidth: any;
      currentId: any;
      reportingManagerId: any;
      projectId: any;
      roleTypeId: any;
      shadow: any;
      taskId: any;
      userId: any;
    }[] = [];
    this.addMemberForm.value.members.forEach((element: any, index: any) => {
      const dto = {
        allocatedFrom: this.datePipe.transform(
          element.startDate,
          'YYYY-MM-dd'
        ) as string,
        allocatedTill: this.datePipe.transform(
          element.endDate,
          'YYYY-MM-dd'
        ) as string,
        bandWidth: element.bandWidth,
        // currentId: localStorage.getItem('userId'),
        currentId : 1,
        reportingManagerId: localStorage.getItem('userId'),
        projectId: project.projectId,
        roleTypeId: element.role,
        shadow: element.shadow,
        taskId: element.task,
        userId: this.memberId[index],
      };
      dto_member.push(dto);
    });

    this.project.addMembers(dto_member).subscribe((data: any) => {
      this.getTeamMembers(index,project);
      this.toastrServiceService.showSuccess('Member Added Successfully !!');
      this.reset();
      this.data[index] = [];
      this.addMemberForm.get('members')?.value.forEach((index:any ) => {      
        this.items.removeAt(index);
      });;
    });
  }

  updatememberHandler = (data: any, index: any,project:any) => {
    const dto = {
      bandWidth: this.addMemberForm.value.bandWidth,
      allocatedFrom: data.allocatedFrom,
      allocatedTill: this.datePipe.transform(
        this.addMemberForm.value.endDate,
        'YYYY-MM-dd'
      ) as string,
      endDate: this.addMemberForm.value.endDate,
      currentId: 1,
      projectId: project.projectId,
      userId: data.userId,
      taskId: this.addMemberForm.value.task,
      roleTypeId: this.addMemberForm.value.role,
      reportingManagerId: sessionStorage.getItem('userId'),
      shadow: this.addMemberForm.value.shadow,
    };
    const teamMemberId = data.projectTeamMemberId;

    this.project.updateMember(dto, teamMemberId).subscribe((data: any) => {

      this.getTeamMembers(index,project);
      this.toastrServiceService.showSuccess('Member updated Successfully !!');
      this.reset();
      data.isEdit = false;
    });
  };

  openAddMemberInput(index:any) {
    this.data[index].push(this.a);
    this.a++;

    const newItem = this.fb.group({
      name: ['', Validators.required],
      task: ['', Validators.required],
      role: ['', Validators.required],
      startDate: [''],
      endDate: [''],
      bandWidth: ['', Validators.required],
      shadow: [''],
    });
    this.items.push(newItem);
  }
  close(data: any) {
    data.isEdit = false;
    this.items.setValue([]);
  }
  remove(index: any) {
    this.items.removeAt(index);
  }
  closeAddMember(index:any) {
    this.data[index] = [];
    this.addMemberForm.reset();
    this.addRowFlag = false;
    this.addMemberForm.get('members')?.value.forEach((index:any ) => {      
      this.items.removeAt(index);
    });;

  }
  reset() {
    this.addMemberForm.reset();
    this.addMemberForm.controls.controlName?.clearValidators();
    this.addMemberForm.controls.controlName?.updateValueAndValidity();
  }
}
