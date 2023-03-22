import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BusinessRoutingModule} from './business-routing.module';
import {BusinessListComponent} from './components/business-list/business-list.component';
import {ClappButtonModule, ClappCardModule, ClappPaginationModule, ClappSearchModule} from '@clapp1/clapp-angular';
import {BusinessCardComponent} from './components/business-card/business-card.component';

@NgModule({
  declarations: [BusinessListComponent, BusinessCardComponent],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappPaginationModule,
    ClappCardModule,
  ],
})
export class BusinessModule {}
