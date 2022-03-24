import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { IGetFeedback } from 'src/assets/interface/feedback/get-feedback-interface.module';

@Component({
  selector: 'app-hr-feedback',
  templateUrl: './hr-feedback.component.html',
  styleUrls: ['./hr-feedback.component.scss'],
})
export class HrFeedbackComponent implements OnInit {
  feedbacks: IGetFeedback[] = [];

  static ngOnInit() {
    throw new Error('Method not implemented.');
  }
  isAcknowledged: boolean = false;
  userId: Number = 1;
  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.onGetFeedback();
  }


  // Get Feedback Subscribe here
  onGetFeedback() {
    this.feedbackService
      .getFeedback(this.isAcknowledged, this.userId)
      .subscribe((data: any) => {
        console.log(data);
        this.feedbacks = data.object;
        console.log(this.feedbacks);
      });
  }
}
