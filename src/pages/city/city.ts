import { Component } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-city',
  templateUrl: 'city.html'
})
export class CityPage {
  public appData:any;
  cities: Array<any> = [];

  constructor(public navCtrl: NavController, public dataProvider:DataProvider) {
     
    this.dataProvider.storage.get('cities').then((val) => {
      this.cities = JSON.parse(val);
    });
  }

  buttonClick(id) {
    this.dataProvider.setCurrentCity(id);
    this.navCtrl.push('MapPage'); 
  }

}