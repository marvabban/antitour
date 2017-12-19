import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpotGroupPage } from './spotgroup';

@NgModule({
  declarations: [
    SpotGroupPage
  ],
  imports: [
    IonicPageModule.forChild(SpotGroupPage)
  ],
  exports: [
    SpotGroupPage
  ]
})
export class SpotGroupPageModule { }
