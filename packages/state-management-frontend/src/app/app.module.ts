import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ConfirmationModalComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
