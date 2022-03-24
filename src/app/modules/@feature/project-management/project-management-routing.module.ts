import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AddNewIndustryComponent } from './components/add-new-industry/add-new-industry.component';
import { AddNewProjectComponent } from './components/add-new-project/add-new-project.component';
import { AddNewVerticalComponent } from './components/add-new-vertical/add-new-vertical.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectManagementComponent } from './project-management.component';
import { SharedService } from './sharedservice.service';

const routes: Routes = [
  {
    path: '',
    data:{
      breadcrumb: 'Verticals'
    },
   children:[
  {
    path:'',
    data:{
      breadcrumb: null
    },
    component:ProjectManagementComponent

  },
  {
    path:'add-new-vertical',
    component: AddNewVerticalComponent,
    data:{
      breadcrumb:'Add New Vertical'
    }
  },
  {
    path: 'add-new-industry',
    component: AddNewIndustryComponent,
    data:{
      breadcrumb :'Add New Industry'
    }

  },
    {
      path:':type',
      data:{
        breadcrumb:'project'
      },
      children:[
        {
          path:'',
          component: ProjectsComponent,
          data:{
            breadcrumb:null
          }
        },
        {
          path:'add-new-project',
          data:{
            breadcrumb :'Add New Project'
          },
          children:[
            {
              path:'',
              component: AddNewProjectComponent,
              data:{
                breadcrumb:null
              }
            },
            {
              path: 'add-new-industry',
              component: AddNewIndustryComponent,
              data:{
                breadcrumb :'Add New Industry'
              }
            }
          ]
        },
      ]
    },
  
  ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule {}
