import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReimbursementComponent } from './reimbursement.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: ReimbursementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReimbursementRoutingModule {}
