import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackComponent } from './feedback.component';
import { HrFeedbackComponent } from './component/hr-feedback/hr-feedback.component';
import { UserFeedbackComponent } from './component/user-feedback/user-feedback.component';
import { FeedbackRoutingModule } from './feedback-routing.module';

//Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FeedbackComponent, HrFeedbackComponent, UserFeedbackComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedbackRoutingModule,
  ],
})
export class FeedbackModule {}
