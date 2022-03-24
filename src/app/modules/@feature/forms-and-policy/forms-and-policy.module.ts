import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewFormComponent } from './Forms/view-form/view-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UploadFormComponent } from './Forms/upload-form/upload-form.component';
import { MatSelectModule } from '@angular/material/select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './Forms/form.component';
import { HrViewformComponent } from './Forms/hr-viewform/hr-viewform.component';
import { HrPolicyComponent } from './policy/components/hr-policy/hr-policy.component';
import { PolicyComponent } from './policy/components/employee-policy/policy.component';
import { MainPolicyComponent } from './policy/main-policy.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// import { DialogComponent } from './Forms/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { FormsAndPolicyComponent } from './forms-and-policy.component';
import { FormsAndPolicyRoutingModule } from './forms-and-policy-routing.module';

@NgModule({
  declarations: [
    ViewFormComponent,
    UploadFormComponent,
    PolicyComponent,
    FormComponent,
    HrViewformComponent,
    HrPolicyComponent,
    MainPolicyComponent,
    DialogComponent,
    FormsAndPolicyComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    NgbPaginationModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
    NgbModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsAndPolicyRoutingModule,
  ],
})
export class FormsAndPolicyModule {}
