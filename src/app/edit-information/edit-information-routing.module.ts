import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditInformationPage } from './edit-information.page';

const routes: Routes = [
  {
    path: '',
    component: EditInformationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditInformationPageRoutingModule {}
