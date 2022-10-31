import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { CreateDoModalPageRoutingModule } from './create-do-modal-routing.module';

import { CreateDoModalPage } from './create-do-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule,
    CreateDoModalPageRoutingModule
  ],
  declarations: [CreateDoModalPage]
})
export class CreateDoModalPageModule {}
