import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {
  public check = true;
  constructor(private activatedRoute: ActivatedRoute) { 
    console.log(this.activatedRoute);
  }
  change(event : any ){
    this.check = event;
  }
  ngOnInit(): void {

  }

}
