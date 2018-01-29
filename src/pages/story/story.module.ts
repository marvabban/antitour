import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoryPage } from './story';

@NgModule({
  declarations: [
    StoryPage
  ],
  imports: [
    IonicPageModule.forChild(StoryPage)
  ],
  exports: [
    StoryPage
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class StoryPageModule { }
