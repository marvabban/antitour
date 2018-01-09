import { MapPageModule } from './../pages/map/map.module';
import { SpotGroupPageModule } from './../pages/spotgroup/spotgroup.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SpotGroupPage } from '../pages/spotgroup/spotgroup'; /** change this to map if only one spot (city) */
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp /** change this to SpotGroupPage if more than one spot (city) */
  ],
  imports: [
    BrowserModule,
    MapPageModule,
    SpotGroupPageModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SpotGroupPage /** change this to MapPage if only one spot (city) */
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider
  ]
})
export class AppModule {}
