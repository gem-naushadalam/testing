import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationStructureComponent } from './organization-structure.component';
import { OrganizationStructureRoutingModule } from './organization-strcuture-routing.module';



@NgModule({
  declarations: [
    OrganizationStructureComponent

  ],
  imports: [
    CommonModule,
    OrganizationStructureRoutingModule
  ]
})
export class OrganizationStructureModule {}
