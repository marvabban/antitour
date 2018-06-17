import { ElementRef, Component, ViewChild } from '@angular/core';
import { IonicPage,  NavController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataProvider } from './../../providers/data/data';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

declare var google;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any = {};
  fpmarkers: any = [];
  markers: any = [];
  currentCity: any = {};
  cur: any = {lat:0,lng:0,iconUrl:""};
  ismap:boolean=false;
  windowopen=false;
  InfoWindowHeader: string = "";
  markerIndex: any = -1;
  InfoWindowStyles: any = { 'left':'20px', 'top':'20px'};
  @ViewChild('fpmap') fpmap: ElementRef;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public dataProvider:DataProvider, private screenOrientation: ScreenOrientation) {
    this.dataProvider.storage.get('currentCity').then((val) => {
      
      this.currentCity = JSON.parse(val);
     
      if(this.currentCity.id==3) {
        this.ismap=false;
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
        this.addFloorplanMarkers();
        
        /* set #mapimg dimensions (100 / auto) based on screen dimension
        if(window.innerHeight-36/window.innerWidth>.461) {
          document.getElementById("fpmap").style.width='100%';
          document.getElementById("fpmap").style.width='auto';
        }
        else {
          document.getElementById("fpmap").style.width='auto';
          document.getElementById("fpmap").style.width=String(window.innerHeight-36)+'px';
        }*/
      }
      else {
        this.ismap=true;
        this.loadMap();
      }
      
    });
  }

  ionViewDidLoad(){
    if(this.currentCity.id==3) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
    }
  }
  ionViewDidLeave(){
    this.screenOrientation.unlock();
  }
  checkOrientation() {
    
    
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
      this.cur.icn="../../assets/img/cur40.png";
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
    var dist = google.maps.geometry.computeDistanceBetween(new google.maps.LatLng(marker.lat,marker.lng),new google.maps.LatLng(this.cur.lat,this.cur.lng))//this.distance.call(marker.lat,marker.lng,this.cur.lat,this.cur.lng);
      console.log(dist);
    this.dataProvider.storage.set("destination", this.currentCity.destination[index]);
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      
      var dist = google.maps.geometry.computeDistanceBetween(new google.maps.LatLng(marker.lat,marker.lng),new google.maps.LatLng(this.cur.lat,this.cur.lng))//this.distance.call(marker.lat,marker.lng,this.cur.lat,this.cur.lng);
      console.log(dist);
      if(dist<.1) {
       infoWindow.open(this.map, marker);
       
      }
    });
  }
   // distance helper function
   distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    var dist = 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km-
    return dist;
  }
   goToStory(index) {
    this.dataProvider.setCurrentStory(index);
    this.navCtrl.push('StoryPage', {"index":index}); 
   }
   addFloorplanMarkers() {
     for (let spot of this.currentCity.destination) {
      var arr : Array<any> = [spot.lat,spot.lon];
      this.fpmarkers.push(arr);
    }
    //this.fpmap.nativeElement.draw();
   }
   goToFPStory() {
    this.dataProvider.setCurrentStory(this.markerIndex);
    this.navCtrl.push('StoryPage', {"index":this.markerIndex}); 
   }
   openIt(canv,evt) {
    //alert(evt.offsetX+" "+evt.offsetY+" "+evt.width+" "+evt.height+" "+evt.target.width);
    // 100% width = evt.target.width
    // 100
    var index=0;
    var curMarkX=0;
    var curMarkY=0;
    for (let spot of this.currentCity.destination) {
      curMarkX=spot.lat*evt.target.width/100;
      curMarkY=spot.lon*evt.target.height/100;
      if(evt.offsetX > (curMarkX-20)&&evt.offsetX < (curMarkX+20)) {
        if(evt.offsetY > (curMarkY-40)&&evt.offsetY < (curMarkY)) {
          
          // in the clicked marker
          this.windowopen=true;
          this.InfoWindowHeader=spot.title;
          this.markerIndex=index;
          // make sure curMarkX and Y don't make window out of bounds
          if(curMarkX<120) { curMarkX=120 }
          else if(curMarkX>(evt.target.width-120)) { curMarkX=evt.target.width-120; }
          if(curMarkY<214) { curMarkY=214; }
          var l=curMarkX+'px';
          var t=curMarkY+'px';
          this.InfoWindowStyles = { 'left':l, 'top':t};
          break;
        }
      }
      ++index;
      // if evt.offsetX>curMarkX-20 and <curMarkX+20   AND evt.offsetY>curMarkY-40 and <curMarkY
        // open window (if closed) set 
    }
  }

  closeit() {
    this.windowopen=false;
  }
}
