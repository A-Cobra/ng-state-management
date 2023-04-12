import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';

import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCardComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ClappCardModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappNoResultsModule,
    ClappPaginationModule,
    ClappImageDisplayModule,
    ReactiveFormsModule,
  ],
})
export class CustomersModule {}
