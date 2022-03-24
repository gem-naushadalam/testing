import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationStructureComponent } from './organization-structure.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Organization-Structure',
    },
    component: OrganizationStructureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationStructureRoutingModule {}
