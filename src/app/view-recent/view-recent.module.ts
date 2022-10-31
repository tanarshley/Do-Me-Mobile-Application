import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRecentPageRoutingModule } from './view-recent-routing.module';

import { ViewRecentPage } from './view-recent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRecentPageRoutingModule
  ],
  declarations: [ViewRecentPage]
})
export class ViewRecentPageModule {}
