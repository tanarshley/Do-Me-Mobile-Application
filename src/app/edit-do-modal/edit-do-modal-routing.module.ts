import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDoModalPage } from './edit-do-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditDoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDoModalPageRoutingModule {}
