import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditInformationPageRoutingModule } from './edit-information-routing.module';

import { EditInformationPage } from './edit-information.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditInformationPageRoutingModule
  ],
  declarations: [EditInformationPage]
})
export class EditInformationPageModule {}
