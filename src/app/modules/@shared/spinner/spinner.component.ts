import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isSpinnerShown!: boolean;

  constructor(private cdRef: ChangeDetectorRef, private loaderService: LoaderService) {
  }

  @Input()
  set show(value: boolean) {
    if (!value) {
      this.isSpinnerShown = false;
      this.cdRef.markForCheck();
      return;
    }
    this.isSpinnerShown = true;
    this.cdRef.markForCheck();
  }

  ngOnInit() {
    console.log('Inside spinner');
  }

}
