import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddServiceCenterPage } from './add-service-center';

@NgModule({
  declarations: [
    AddServiceCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddServiceCenterPage),
  ],
})
export class AddServiceCenterPageModule {}
