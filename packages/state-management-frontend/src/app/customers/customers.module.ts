import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerCardComponent } from './components/customer-card/customer-card.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersService } from './services/customers.service';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappTopbarModule,
  ModalService,
} from '@clapp1/clapp-angular';
import { CustomerOrderSelectAddressComponent } from './components/customer-order-select-address/customer-order-select-address.component';

const clappModules = [
  ClappCardModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappNoResultsModule,
  ClappImageDisplayModule,
  ClappPaginationModule,
  ClappNotificationModule,
  ClappTopbarModule,
];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCardComponent,
    CustomerDetailsComponent,
    CustomerOrderSelectAddressComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    ...clappModules,
    LoaderComponent,
  ],
  providers: [ModalService, CustomersService],
})
export class CustomersModule {}
