import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { ToastrServiceService } from 'src/app/services/toastr-service/toastr-service.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss'],
})
export class UserFeedbackComponent implements OnInit {
  // feedbackSubject: String = '';
  remarks: String = '';
  tittle: String = '';
  currentId: Number = 1;

  addFeedbackForm!: FormGroup;

  constructor(
    private feedbackService: FeedbackService,
    private toastrServiceService: ToastrServiceService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addFeedbackForm = this.formBuilder.group({
      tittle: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    });
  }

  onSubmitFeedback() {
    // if (this.addFeedbackForm.valid) {
    //   alert('Feedback is valid!!');
    // } else {
    //   alert('Feedback is not valid!!');
    // }

    const data = {
      currentId: 1,
      remarks: this.addFeedbackForm.get('remarks')?.value,
      tittle: this.addFeedbackForm.get('tittle')?.value,
    };
    this.feedbackService.addFeedback(data).subscribe((res) => {
      console.log(res);
      // this.feedbackService.getFeedback();
      // HrFeedbackComponent.ngOnInit();
    });
    this.showToasterSuccess();
    console.log(this.addFeedbackForm.value);
    this.addFeedbackForm.reset();
  }

  showToasterSuccess() {
    this.toastrServiceService.showSuccess('Feedback Sumbimitted !!');
  }

  showToasterError() {
    this.toastrServiceService.showError(
      'Something is wrong',
      'ItSolutionStuff.com'
    );
  }

  showToasterInfo() {
    this.toastrServiceService.showInfo('This is info', 'ItSolutionStuff.com');
  }

  showToasterWarning() {
    this.toastrServiceService.showWarning(
      'This is warning',
      'ItSolutionStuff.com'
    );
  }
}
