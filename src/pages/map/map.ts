import { Component } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from './../../providers/data/data';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any = {};
  markers: any = [];
  currentCity: any = {};
  cur: any = {lat:0,lng:0,iconUrl:""};
  windowopen=false;
  InfoWindowHeader: string = "";
  markerIndex: any = -1;
  InfoWindowStyles: any = { 'left':'20px', 'top':'20px','height':'auto'};

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public dataProvider:DataProvider) {
    this.dataProvider.storage.get('currentCity').then((val) => {
      this.currentCity = JSON.parse(val);
        this.loadMap();
    });
  }

  ionViewDidLoad(){

  }

  loadMap(){
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {

      this.map = {
        lat: +this.currentCity.lat,
        lng: +this.currentCity.lon,
        zoom: 12
      }
      this.addMarkers();
      this.cur.lat=resp.coords.latitude;
      this.cur.lng=resp.coords.longitude;
      this.cur.icn="http://antitourismtour.com/app-data/img/cur40.png";
    });
  }

  addMarkers(){
    for (let spot of this.currentCity.destination) {
        let content = "<h4>"+spot.title+"</h4>";
        this.markers.push(
          { 'lat':+spot.lat,'lng':+spot.lon,'content':content }
        );
      }
   }
   addInfoWindow(marker, content, index){
    this.dataProvider.storage.set("destination", this.currentCity.destination[index]);
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
    });
  }

   goToStory(index) {
    this.dataProvider.setCurrentStory(index);
    this.navCtrl.push('StoryPage', {"index":index});
   }

}
