import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProjectsComponent } from './components/projects/projects.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import { AddNewVerticalComponent } from './components/add-new-vertical/add-new-vertical.component';
import { AddNewProjectComponent } from './components/add-new-project/add-new-project.component';
import { VerticalsComponent } from './components/verticals/verticals.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOption, MatOptionModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectFilterModule } from 'mat-select-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewIndustryComponent } from './components/add-new-industry/add-new-industry.component';
import { SharedService } from './sharedservice.service';



@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectsComponent,
    AddNewVerticalComponent,
    AddNewProjectComponent,
    VerticalsComponent,
    BreadcrumbComponent,
    AddNewIndustryComponent,
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatExpansionModule,
    BreadcrumbModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatSelectFilterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers:[
    SharedService
  ]
})
export class ProjectManagementModule { }
