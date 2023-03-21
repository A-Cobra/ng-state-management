import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';

@NgModule({
  declarations: [BusinessEditComponent],
  imports: [CommonModule, BusinessRoutingModule],
})
export class BusinessModule {}
