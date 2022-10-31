import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDoModalPage } from './create-do-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDoModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDoModalPageRoutingModule {}
