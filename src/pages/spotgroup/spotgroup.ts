import { Component } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-spotgroup',
  templateUrl: 'spotgroup.html'
})
export class SpotGroupPage {
  public appData:any;
  cities: Array<any> = [];

  constructor(public navCtrl: NavController, public dataProvider:DataProvider) {
    this.setCities();
  }

  setCities() {
      this.cities = this.dataProvider.getCities();
  }

  buttonClick(id) {
    this.dataProvider.setCurrentCity(id);
    this.navCtrl.setRoot('MapPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }
}
