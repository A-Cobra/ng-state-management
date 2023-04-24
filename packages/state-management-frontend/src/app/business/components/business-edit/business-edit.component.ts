import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { of } from 'rxjs';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { FormEditPayload } from '../../models/form-edit-payload.model';
import { defaultBusinessData } from '../../utils/default-business-data';

@Component({
  selector: 'app-business-edit',
  templateUrl: './business-edit.component.html',
  styleUrls: ['./business-edit.component.scss'],
})
export class BusinessEditComponent implements OnInit {
  businessId = 5;
  hasQueryError = false;
  isEditing = false;
  hasActiveRequest = false;
  businessData = defaultBusinessData;
  mockBackendData = defaultBusinessClassificationBackendData;
  private numberRegexPattern = /^[0-9]+$/;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((urlData: Params) => {
      const urlIdSting = urlData?.['id'];
      if (!urlIdSting.match(this.numberRegexPattern)) {
        this.hasQueryError = true;
        return;
      }
    });
  }

  handleEditFormSubmission(payload: FormEditPayload): void {
    this.hasActiveRequest = true;
    // TODO
  }

  handleBusinessDeletion(payload: FormEditPayload): void {
    this.hasActiveRequest = true;
    // TODO
  }
}
