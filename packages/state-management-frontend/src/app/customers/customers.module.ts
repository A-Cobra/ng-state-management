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
  ModalService,
} from '@clapp1/clapp-angular';

import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { LoaderComponent } from '../shared/components/loader/loader.component';

const clappModules = [
  ClappCardModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappNoResultsModule,
  ClappImageDisplayModule,
  ClappPaginationModule,
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCardComponent,
    CustomerDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    ...clappModules,
    LoaderComponent,
  ],
  providers: [ModalService],
})
export class CustomersModule {}
