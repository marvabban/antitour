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
      console.log("in dataprovider constructor");
    });
  }

  buttonClick(id) {
    console.log("in buttonClick");
    this.dataProvider.setCurrentCity(id);
    this.navCtrl.setRoot('MapPage', {}, {
      animate: true,
      direction: 'forward'
    }); 
  }

}