import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { defaultBusinessClassificationBackendData } from '../../../core/utils/default-business-classification-backend-data';
import { defaultBusinessData } from '../../../core/utils/default-business-data';
import { FormEditPayload } from '../../models/form-edit-payload.interface';

@Component({
  selector: 'state-management-app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent implements OnInit {
  // TO SIMULATE DATA FROM THE BE
  mockBusinessService$ = of(19);
  businessId = 5;
  queryError = false;
  editing = false;
  // Needs adequate typing when we know what the BE sends
  businessData = defaultBusinessData;
  mockBackendData = defaultBusinessClassificationBackendData;

  private numberRegexPattern = /^[0-9]+$/;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((urlData: Params) => {
      const urlIdSting = urlData?.['id'];
      if (!urlIdSting.match(this.numberRegexPattern)) {
        this.queryError = true;
        return;
      }
      // When the service is ready
      // const urlId = parseInt(urlIdSting);
      // this.businessService.getBusinessData(urlId).
      this.mockBusinessService$.subscribe({
        error: (error) => {
          this.queryError = true;
          // IMPLEMENT
          // this.handleQueryError(error);
        },
        next: (businessId: number) => {
          this.businessId = businessId;
        },
      });
    });
  }

  handleEditFormSubmission(payload: FormEditPayload): void {
    // IMPLEMENT
    console.log(payload);
    // this.businessService.updateBusiness(payload);
  }
}
