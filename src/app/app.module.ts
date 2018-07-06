import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CityPage } from '../pages/city/city';
import { DataProvider } from '../providers/data/data';
import { CityPageModule } from './../pages/city/city.module';
import { MapPageModule } from './../pages/map/map.module';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    MapPageModule,
    CityPageModule,
    HttpClientModule,
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
    //ScreenOrientation,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
