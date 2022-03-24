import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { EmployeeDirectoryComponent } from './employee-directory.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: EmployeeDirectoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDirectoryRoutingModule {
}
