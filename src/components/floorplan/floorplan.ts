import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { DataProvider } from './../../providers/data/data';

/**
 * Generated class for the FloorplanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'floorplan',
  templateUrl: 'floorplan.html'
})
export class FloorplanComponent {
  markers: any = [];
  currentCity: any = {};
  floorplanURL: string;

  constructor(public navCtrl: NavController, public dataProvider:DataProvider) {
    this.floorplanURL="http://antitourismtour.com/app-data/locations/openspace/img/Open-Space-floorplan.jpg";
    this.dataProvider.storage.get('currentCity').then((val) => {
      console.log("city="+val);
      //console.log("city="+val);
      this.currentCity = JSON.parse(val);
      
        this.addFloorplanMarkers();
      
    });
  }

  goToStory(index) {
    console.log("in buttonClick"+index);
    this.dataProvider.setCurrentStory(index);
    this.navCtrl.push('StoryPage', {"index":index}); 
   }
   addFloorplanMarkers() {
    alert("adding markers");
   }

}
