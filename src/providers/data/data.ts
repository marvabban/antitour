import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  data: any;
  cities: Array<any> = []
  currentCityID: number = -1;
  currentCity: any = {};

  constructor(public http: Http, public storage:Storage) {
    this.load().then(data => {
      console.log("loading data");
      this.data = data;
      // keep data in local storage
      storage.set('localdata', JSON.stringify(this.data));
      for (var i of this.data.location) {
        let tempObj = {"name":i.name,"id":i.Id,"imgCaption":i.img[0].caption,"imgPath":i.img[0].path}
        this.cities.push(tempObj);
       }
      storage.set('cities', JSON.stringify(this.cities));
      console.log("cities length="+this.cities.length+" 1st city="+this.cities[0].name+" 2nd city="+this.cities[1].name);
    });
  }

  load(): any {
    return this.http.get('assets/data/data.json')
      .map(res => res.json()).toPromise();
  }


  setCurrentCity(id) {
    this.currentCityID = id;
    // set all city stuff
    for (var i of this.data.location) {
      if(i.id=id) {
        console.log("in setCurrentCit matched id");
        this.currentCity = {"name":i.name,"id":i.Id,"lat":j.lat,"lon":j.lon,"imgCaption":i.img[0].caption,"imgPath":i.img[0].path, "destination":[]};
        
        for(var j of i.destination) {
          console.log("in destination");
          this.currentCity.destination.push({"lat":j.lat,"lon":j.lon,"title":j.title,"audiopath":j.audiopath,"imgCaption":j.img[0].caption,"imgPath":j.img[0].path});
        }
      }
      this.storage.set("currentCity",JSON.stringify(this.currentCity));
     }
     console.log("in setCurrentCity="+this.currentCity);
  }
  getCurrentCity() {
    console.log("in getCurrentCity="+this.currentCity);
    return this.currentCity;
  }
  getCities() {
    return this.storage.get('cities');
  }
}
