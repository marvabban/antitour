import { Component, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentCity: any = {};
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public dataProvider:DataProvider) {
    dataProvider.storage.get('currentCity').then((val) => {
      this.currentCity = JSON.parse(val);
      this.loadMap();
    });
  }
 
  ionViewDidLoad(){
    //this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(this.currentCity.lat, this.currentCity.lon);
    
    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarkers();
  }

  addMarkers(){
    for (let spot of this.currentCity.destination) {
      let spotLatLng = new google.maps.LatLng(spot.lat, spot.lon);
      console.log("in add markers");
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: spotLatLng
      });
      let content = "<h4>"+spot.title+"</h4><button ion-button color='light'>Hear the story</button>";         
      this.addInfoWindow(marker, content);
      }
   }

   addInfoWindow(marker, content){
    
     let infoWindow = new google.maps.InfoWindow({
       content: content
     });
    
     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });
   }
}
