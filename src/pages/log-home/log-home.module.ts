import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LogHomePage } from './log-home';

@NgModule({
  declarations: [
    LogHomePage,
  ],
  imports: [
    IonicPageModule.forChild(LogHomePage),
  ],
})
export class LogHomePageModule {}
