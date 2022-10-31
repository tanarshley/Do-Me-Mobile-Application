import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDoModalPageRoutingModule } from './edit-do-modal-routing.module';

import { EditDoModalPage } from './edit-do-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDoModalPageRoutingModule
  ],
  declarations: [EditDoModalPage]
})
export class EditDoModalPageModule {}
