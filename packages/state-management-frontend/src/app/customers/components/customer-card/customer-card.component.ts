import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomerInterface } from '@state-management-app/types';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCardComponent {
  @Input() customer: CustomerInterface;
}
