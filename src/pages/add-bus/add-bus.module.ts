import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddBusPage } from './add-bus';

@NgModule({
  declarations: [
    AddBusPage,
  ],
  imports: [
    IonicPageModule.forChild(AddBusPage),
  ],
})
export class AddBusPageModule {}
