import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationMainComponent } from './components/classification-main/classification-main.component';

const routes: Routes = [{ path: '', component: ClassificationMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
