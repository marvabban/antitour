import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    MapPage
  ],
  imports: [
    IonicPageModule.forChild(MapPage),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyARb8UGWOZ15KNy9IjxDtO7_8v20JTiJCk'}),
    AgmSnazzyInfoWindowModule
  ],
  exports: [
    MapPage
  ]
})
export class MapPageModule { }
