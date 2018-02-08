import { MapPageModule } from './../pages/map/map.module';
import { CityPageModule } from './../pages/city/city.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CityPage } from '../pages/city/city'; /** change this to map if only one spot (city) */
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { AudioProvider } from '../providers/audio/audio';

@NgModule({
  declarations: [
    MyApp /** change this to SpotGroupPage if more than one spot (city) */
  ],
  imports: [
    BrowserModule,
    MapPageModule,
    CityPageModule,
    HttpModule,
    IonicStorageModule.forRoot(),
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
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AudioProvider
  ]
})
export class AppModule {}
