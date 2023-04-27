import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomersComponent } from './components/customers/customers.component';
import { CustomerOrderSelectAddressComponent } from './components/customer-order-select-address/customer-order-select-address.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
  },
  {
    path: ':customerId',
    component: CustomerDetailsComponent,
  },
  {
    path: 'order',
    data: { title: 'Order' },
    children: [
      {
        path: 'select-address',
        component: CustomerOrderSelectAddressComponent,
      },
      {
        path: 'create-address',
        component: CustomerOrderSelectAddressComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
