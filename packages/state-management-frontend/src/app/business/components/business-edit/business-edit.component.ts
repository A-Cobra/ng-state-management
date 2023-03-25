import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
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
  businessData = {
    displayName: 'Business Display Name',
    businessName: 'Business Name',
    businessClassification: 'Option 2',
    contactPhoneNumber: '987654321',
    contactEmail: 'name@domain.suffix',
    contactAddress: 'Address',
    longitude: 'Longitude',
    latitude: 'Latitude',
    imgUrl: '',
    totalBranches: 12,
  };
  mockBackendData = [
    {
      key: 'Option 1',
      disabled: true,
    },
    {
      key: 'Option 2',
      disabled: false,
    },
    {
      key: 'Option 3',
      disabled: false,
    },
    {
      key: 'Option 4',
      disabled: false,
    },
    {
      key: 'Option 5',
      disabled: false,
    },
    {
      key: 'Option 5',
      disabled: false,
    },
  ];

  private regexPattern = /^[0-9]+$/;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((urlData: Params) => {
      const urlIdSting = urlData?.['id'];
      if (!urlIdSting.match(this.regexPattern)) {
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
    console.log(payload);
    // this.businessService.updateBusiness(payload);
  }
}
