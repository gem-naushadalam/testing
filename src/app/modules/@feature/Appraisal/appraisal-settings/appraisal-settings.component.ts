import { Component, OnInit } from '@angular/core';
import { AppraisalService } from 'src/app/services/appraisal/appraisal.service';
import { IGetAppraisalCycle } from 'src/assets/interface/appraisal/get-appraisal-cycle';

@Component({
  selector: 'app-appraisal-settings',
  templateUrl: './appraisal-settings.component.html',
  styleUrls: ['./appraisal-settings.component.scss'],
})
export class AppraisalSettingsComponent implements OnInit {
  constructor(private appraisalService: AppraisalService) {}
  cycle: boolean = false;
  addparams: boolean = false;
  viewparams: boolean = false;
  appraisalCycleData: any = [];
  settingBtnIdx = -1;
  eyeBtnIdx = -1;

  ngOnInit(): void {
    this.getAppraisalCycleData();
  }
  AppraisalCycle() {
    this.cycle = !this.cycle;
    this.addparams = false;
    this.viewparams = false;
  }
  AddParameter() {
    this.addparams = !this.addparams;
    this.cycle = false;
    this.viewparams = false;
  }
  ViewParameter() {
    this.viewparams = !this.viewparams;
    this.addparams = false;
    this.cycle = false;
  }

  getAppraisalCycleData() {
    this.appraisalService.getAppraisalCycle().subscribe((data) => {
      console.log(data.object);
      this.appraisalCycleData = data.object;
    });
  }

  settingBtnClick(id: any) {
    this.resetIdx();
    console.log(id);
    this.settingBtnIdx = id;
  }

  eyeBtnClick(id: any) {
    this.resetIdx();
    console.log(id);
    this.eyeBtnIdx = id;
  }

  resetIdx = () => {
    this.settingBtnIdx = -1;
    this.eyeBtnIdx = -1;
  };
}
