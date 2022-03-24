import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from 'ng-sidebar';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

// Components
import { LeaveComponent } from './leave.component';
import { TableComponent } from './components/table/table.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { MenuComponent } from './components/menu/menu.component';
import { SharedModule } from '../../@shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { WfhRequestComponent } from './components/wfh-request/wfh-request.component';
import { CompOffRequestComponent } from './components/comp-off-request/comp-off-request.component';
import { OutDutyRequestComponent } from './components/out-duty-request/out-duty-request.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRoutingModule } from './leave-routing.module';
import { DatePipe } from '@angular/common';
import { LnsaComponent } from './components/lnsa/lnsa.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReviewTableComponent } from './components/review-table/review-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    LeaveComponent,
    TableComponent,
    LeaveRequestComponent,
    MenuComponent,
    WfhRequestComponent,
    CompOffRequestComponent,
    OutDutyRequestComponent,
    LnsaComponent,
    ReviewTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    FontAwesomeModule,
    SidebarModule.forRoot(),
    MatTableModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatNativeDateModule,
    MatInputModule,
    SharedModule,
    MatTabsModule,
    MatGridListModule,
    LeaveRoutingModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatListModule,
    MatSnackBarModule,
    MatFormFieldModule,
    InfiniteScrollModule,
  ],
  exports: [LeaveComponent],
  providers: [MatDatepickerModule, DatePipe],
})
export class LeaveModule {}
