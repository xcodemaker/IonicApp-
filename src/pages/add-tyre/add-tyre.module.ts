import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTyrePage } from './add-tyre';

@NgModule({
  declarations: [
    AddTyrePage,
  ],
  imports: [
    IonicPageModule.forChild(AddTyrePage),
  ],
})
export class AddTyrePageModule {}
