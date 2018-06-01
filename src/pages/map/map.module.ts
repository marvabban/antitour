import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapPage } from './map';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FloorplanComponent } from './../../components/floorplan/floorplan'
import { ImgMapComponent } from 'ng2-img-map/ng2-img-map';

@NgModule({
  declarations: [
    MapPage,
    FloorplanComponent,
    ImgMapComponent
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
