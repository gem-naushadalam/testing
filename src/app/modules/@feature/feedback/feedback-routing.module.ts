import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FeedbackComponent } from './feedback.component';


const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null
    },
    component: FeedbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule {
}
