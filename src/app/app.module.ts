import { MapPageModule } from './../pages/map/map.module';
import { CityPageModule } from './../pages/city/city.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import { CityPage } from '../pages/city/city'; /** change this to map if only one spot (city) */
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
//import { FloorplanComponent } from '../components/floorplan/floorplan'
//import { AudioProvider } from '../providers/audio/audio';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    MapPageModule,
    CityPageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyARb8UGWOZ15KNy9IjxDtO7_8v20JTiJCk'}),
    AgmSnazzyInfoWindowModule,
   // Floor
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CityPage /** change this to MapPage if only one spot (city) */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
