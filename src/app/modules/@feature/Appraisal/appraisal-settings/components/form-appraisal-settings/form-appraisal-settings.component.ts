import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppraisalService } from 'src/app/services/appraisal/appraisal.service';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { IGetAppraisalCycle } from 'src/assets/interface/appraisal/get-appraisal-cycle';

@Component({
  selector: 'app-form-appraisal-settings',
  templateUrl: './form-appraisal-settings.component.html',
  styleUrls: ['./form-appraisal-settings.component.scss'],
})
export class FormAppraisalSettingsComponent implements OnInit {
  appraisalSettingsForm!: FormGroup;
  open: boolean = true;
  public filteredList1: any = [];
  teams: any = [];
  teamId: any = [];
  appraisalCycleData: IGetAppraisalCycle[] = [];
  @Input() resetIdx!: any;
  @Input() formData: any = null;

  constructor(
    public fb: FormBuilder,
    public empService: EmployeeDirectoryService,
    public appraisalService: AppraisalService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.open = true;
    this.appraisalSettingsForm = this.fb.group({
      team: new FormControl('', Validators.required),
      cycle: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      selfAppraisalDate: new FormControl('', Validators.required),
      appraisarReviewDate: new FormControl('', Validators.required),
      approvalDate: new FormControl('', Validators.required),
    });
    this.getTeamName();
    this.getAppraisalCycleData();
    console.log(this.formData);
    // this.resetIdx();
  }

  getAppraisalCycleData() {
    this.appraisalService.getAppraisalCycle().subscribe((data) => {
      console.log(data.object);
      this.appraisalCycleData = data.object;
    });
  }

  getTeamName() {
    this.empService.getDepartmentsByGraphQl().subscribe((data: any) => {
      data.data.departments.forEach((department: any) => {
        this.teams = [...this.teams, ...department.teams];
        // console.log(this.teams);
      });
      this.teams.sort((a: any, b: any) => {
        if (a.teamName < b.teamName) {
          return -1;
        }
        return 1;
      });
      this.filteredList1 = this.teams.slice();
    });
  }

  close() {
    this.open = false;
  }

  onFormSubmit() {
    let team = this.appraisalSettingsForm.get('team')?.value;
    console.log(team);

    let appraisalId = this.formData.appraisalCycleId;

    const body = {
      appraiserEndDate: this.datePipe.transform(
        this.appraisalSettingsForm.get('appraisarReviewDate')?.value,
        'YYYY-MM-dd'
      ) as string,
      approvalEndDate: this.datePipe.transform(
        this.appraisalSettingsForm.get('approvalDate')?.value,
        'YYYY-MM-dd'
      ) as string,
      cycleEndDate: this.datePipe.transform(
        this.appraisalSettingsForm.get('endDate')?.value,
        'YYYY-MM-dd'
      ) as string,
      cycleStartDate: this.datePipe.transform(
        this.appraisalSettingsForm.get('startDate')?.value,
        'YYYY-MM-dd'
      ) as string,
      selfAppraisalEndDate: this.datePipe.transform(
        this.appraisalSettingsForm.get('selfAppraisalDate')?.value,
        'YYYY-MM-dd'
      ) as string,
      teamIds: team,
    };

    this.appraisalService
      .postAppraisalSettings(appraisalId, body)
      .subscribe(() => {
        console.log('success');
      });
  }
}

// getAllDesignation() {
//   this.empService.getDesignationByGraphQl().subscribe((data: any) => {
//     console.log(data.data.designations);
//     let getAllDesignation;
//     getAllDesignation = data.data.designations.forEach((designation: any) => {
//       console.log(designation.designationName);
//       this.designationName = designation.designationName;
//     });
//   });
// }
