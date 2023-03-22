import {Component, Input} from '@angular/core';

@Component({
  selector: 'state-management-app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.scss'],
})
export class BusinessCardComponent {
  @Input() businessId: number;
}
