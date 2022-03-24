import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReimbursementComponent } from './reimbursement.component';
import { HistoryComponent } from './components/history/history.component';
import { ReviewComponent } from './components/review/review.component';
import { ReimbursementRoutingModule } from './reimbursement-routing.module';
import { MainComponent } from './components/main/main.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [
    ReimbursementComponent,
    HistoryComponent,
    ReviewComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ReimbursementRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    PdfViewerModule,

  ]
})
export class ReimbursementModule { }
