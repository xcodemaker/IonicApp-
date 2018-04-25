import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecordsAddPage } from './records-add';

@NgModule({
  declarations: [
    RecordsAddPage,
  ],
  imports: [
    IonicPageModule.forChild(RecordsAddPage),
  ],
})
export class RecordsAddPageModule {}
