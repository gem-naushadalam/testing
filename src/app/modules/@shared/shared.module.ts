import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FlexLayoutModule } from '@angular/flex-layout';

import { RouterModule } from '@angular/router';

//Component
import { HeaderComponent } from './header/header.component';
import { SidebarToggleComponent } from './sidebar-toggle/sidebar-toggle.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedComponent } from './shared.component';

//Directive
import { ExpandMenu } from './directive/expand-menu.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkLoaderInterceptor } from 'src/app/services/interceptors/network-loader.interceptor';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ApproverDialogComponent } from './approver-dialog/approver-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { LoadingInterceptor } from 'src/app/services/interceptors/network-loader.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SidebarToggleComponent,
    SharedComponent,
    ExpandMenu,
    SpinnerComponent,
    ApproverDialogComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule
    // SharedComponent
  ],

  exports: [
    HeaderComponent,
    SidebarComponent,
    SidebarToggleComponent,
    SharedComponent,
    SpinnerComponent,
  ],
  providers: [],
})
export class SharedModule {}
