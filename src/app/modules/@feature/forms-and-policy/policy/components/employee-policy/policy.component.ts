import { Component, OnInit } from '@angular/core';
import { PolicyService } from 'src/app/services/policy/policy.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpParams } from '@angular/common/http';
import { IPolicyData } from 'src/assets/interface/policy/policy-interface.module';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  // isHr: boolean = checkIsHr();
  public isUser: boolean = true;
  public errorMsg: any;
  public policyPdf: any;
  public fileUrl!: any;
  public policyData: IPolicyData[] = [];
  public filteredPolicies: IPolicyData[] = [];
  private _searchPolicy: string = '';
  searchText: any;

  get searchPolicy(): string {
    return this._searchPolicy;
  }

  set searchPolicy(value: string) {
    this._searchPolicy = value;
    this.filteredPolicies = this.performFilter(value);
  }

  performFilter(filterBy: string): IPolicyData[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.policyData.filter((policy) => {
      policy.policyName.toLocaleLowerCase().includes(filterBy);
    });
  }

  constructor(
    private policyService: PolicyService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getPolicy();
  }

  getPolicy() {
    this.policyService.getPolicies(this.isUser).subscribe(
      (data: any) => {
        this.policyData = data.object;
        this.filteredPolicies = this.policyData;
        console.log(this.policyData);
      },
      (error: any) => {
        this.errorMsg = error;
      }
    );
  }

  public getPdfPolicy(id: any, openModal = false, content: any) {
    console.log(id);
    let params = new HttpParams();
    params = params.set('policyId', id);

    this.policyService.getPolicyPdf(params).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      this.fileUrl = URL.createObjectURL(blob);
      if (openModal) {
        open(content);
      }
      // window.open(fileUrl);

      console.log(data);

      console.log(blob);
      console.log(this.fileUrl);
    });
  }

  public open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(result);
          // this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
}
