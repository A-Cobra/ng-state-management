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
import { CustomerAddressCardComponent } from './components/customer-address-card/customer-address-card.component';
import { AddressesService } from './services/addresses.service';

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

const services = [ModalService, CustomersService, AddressesService];

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCardComponent,
    CustomerDetailsComponent,
    CustomerOrderSelectAddressComponent,
    CustomerAddressCardComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    ...clappModules,
    LoaderComponent,
  ],
  providers: [...services],
})
export class CustomersModule {}
