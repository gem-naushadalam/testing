import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsAndPolicyComponent } from './forms-and-policy.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: FormsAndPolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsAndPolicyRoutingModule {}
