import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppraisalService } from 'src/app/services/appraisal/appraisal.service';

// const ELEMENT_DATA = [
//   { parameter: 'Parameter A', competency: 'Technical', weightage: 5 },
//   { parameter: 'Parameter B', competency: 'Technical', weightage: 4 },
//   { parameter: 'Parameter C', competency: 'Technical', weightage: 4 },
//   { parameter: 'Parameter D', competency: 'Technical', weightage: 5 },
// ];

@Component({
  selector: 'app-view-parameters',
  templateUrl: './view-parameters.component.html',
  styleUrls: ['./view-parameters.component.scss'],
})
export class ViewParametersComponent implements OnInit {
  displayedColumns: string[] = [
    'parameter',
    'competency',
    'weightage',
    'actions',
  ];
  @Input() resetIdx!: any;
  @Input() formData: any = null;

  // dataSource = new MatTableDataSource();
  // dataSource = ELEMENT_DATA;
  parameterData: any = [];

  constructor(private appraisalSvc: AppraisalService) {}

  ngOnInit(): void {
    this.getAllParameters();
    console.log(this.formData);
  }

  getAllParameters = () => {
    this.appraisalSvc.getAllParameters().subscribe((data: any) => {
      this.parameterData = data.object;
      console.log(data.object);
    });
  };
}
