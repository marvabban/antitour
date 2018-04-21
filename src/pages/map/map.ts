import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from './../../providers/data/data';



declare var google;
declare var GeolocationMarker;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any = {};
  markers: any = [];
  currentCity: any = {};
  constructor(public navCtrl: NavController,/* public geolocation: Geolocation,*/ public dataProvider:DataProvider) {
    this.dataProvider.storage.get('currentCity').then((val) => {
      this.currentCity = JSON.parse(val);
      this.loadMap();
    });
  }
 
  ionViewDidLoad(){
    
  }
 
  loadMap(){
 
    /* let latLng = new google.maps.LatLng(this.currentCity.lat, this.currentCity.lon);
    
    let mapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let GeoMarker = new GeolocationMarker(this.map);
    this.addMarkers(); */
    this.map = {
      lat: +this.currentCity.lat,
      lng: +this.currentCity.lon,
      zoom: 12
    }
    this.addMarkers();
    
  }

  addMarkers(){
    let i=0;
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
       console.log("ine info window clicked");
     });
   }
   goToStory(index) {
    console.log("in buttonClick"+index);
    this.dataProvider.setCurrentStory(index);
    this.navCtrl.setRoot('StoryPage', {"index":index}, {
      animate: true,
      direction: 'forward'
    }); 
   }
}
