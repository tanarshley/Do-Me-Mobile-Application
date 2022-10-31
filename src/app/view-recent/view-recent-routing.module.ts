import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRecentPage } from './view-recent.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRecentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRecentPageRoutingModule {}
