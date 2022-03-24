import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDirectoryComponent } from './employee-directory.component';
import { SharedModule } from '../../@shared/shared.module';
import { EmpTableComponent } from './emp-table/emp-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkLoaderInterceptor } from 'src/app/services/interceptors/network-loader.interceptor';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDirectoryRoutingModule } from './employee-directory-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    EmployeeDirectoryComponent,
    EmpTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
    NgxPaginationModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    MatTabsModule,
    InfiniteScrollModule
  ],
  exports: [
    EmployeeDirectoryComponent,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    EmployeeDirectoryRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkLoaderInterceptor,
      multi: true,
    },
  ],
})
export class EmployeeDirectoryModule {}
