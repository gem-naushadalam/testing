import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';

@Component({
  selector: 'app-my-appraisal',
  templateUrl: './my-appraisal.component.html',
  styleUrls: ['./my-appraisal.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class MyAppraisalComponent implements OnInit {
  public isMobile!: Boolean;
  public imgSrc!: '../../../../../../../assets/img//Group 28.png';

  constructor(
    private responsiveService: ResponsiveService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onResize();
    this.responsiveService.checkWidth();
  }
  onResize() {
    this.responsiveService.getMobileStatus().subscribe((isMobile) => {
      console.log(isMobile);
      this.isMobile = isMobile;
    });
  }

  onLoadBasicInformation() {
    // console.log('here');
    this.router.navigate(['basic-information'], { relativeTo: this.route });
  }
  onLoadFinalSubmit(){
    this.router.navigate(['final-form'],{relativeTo: this.route});
  }
}
