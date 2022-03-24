import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EmployeeDirectoryService } from 'src/app/services/employee-directory/employee-directory.service';
import { ProjectModuleService } from 'src/app/services/project-module/project-module.service';
import { SharedService } from '../../sharedservice.service';

@Component({
  selector: 'app-verticals',
  templateUrl: './verticals.component.html',
  styleUrls: ['./verticals.component.scss']
})
export class VerticalsComponent implements OnInit,OnChanges {
  cards: any ;
  verticals:boolean = true;
  industries:boolean = false;
  @Output() isVerticals = new EventEmitter<any>();
  constructor(public projectService : ProjectModuleService, public empservice:EmployeeDirectoryService, public router:ActivatedRoute, public shared : SharedService) { }

  ngOnInit(): void {
    this.shared.ifVertical = this.verticals;
    this.getVerticals();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.shared.ifVertical = this.verticals;
  }
  getIndustries(){
    this.projectService.getAllIndustries().subscribe((data:any) => {
      console.log(data);
      this.cards=data.object;
    })
  }
  getVerticals(){
    this.projectService.getVerticals().subscribe((data:any)=>{
      console.log(data);
      this.cards = data.object;
      for (var key in this.cards) {
        this.getEmployeeName(this.cards[key].ownerId, key);
      }
    })
  }
  getEmployeeName(userId: any, key: any) {
    let name;
    let email;
    let imgPath;
    console.log(userId);
    this.empservice
      .getEmployeeDetailsByuserId(userId)
      .subscribe((data: any) => {
        imgPath = data.object.profileImagePath;
        this.cards[key] = Object.assign(
          { imgPath },
          this.cards[key]
        );

        // this.dataSource.data = this.tableData;
        console.log(this.cards);
      });
  }
  checkVerticals(){
   this.verticals = true;
   this.industries = false;
   this.getVerticals();
   this.isVerticals.emit(true);
   this.shared.setVertical(true);
  }
  checkIndustries(){
 this.industries = true;
 this.verticals = false;
 this.getIndustries(); 
 this.isVerticals.emit(false);
 this.shared.setVertical(false);

  }

}
