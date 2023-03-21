import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BusinessEditComponent],
  imports: [CommonModule, BusinessRoutingModule, ReactiveFormsModule],
})
export class BusinessModule {}
