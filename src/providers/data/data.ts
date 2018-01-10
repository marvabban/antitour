import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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

  constructor(public http: Http) {
   
  }

  load(): any {
    return this.http.get('assets/data/data.json')
      .map(res => res.json()).toPromise();
  }

  setData(data:any) {
    this.data=data;
  }
  setCities(cities:Array<String>) {
    this.cities=cities;
  }
  setCurrentCity(id) {
    this.currentCityID = id;
    // set all city stuff
    for (var i of this.data.location) {
      if(i.id=id) {
        this.currentCity = {"name":i.name,"id":i.Id,"lat":j.lat,"lon":j.lon,"imgCaption":i.img[0].caption,"imgPath":i.img[0].path, "destination":[]};
        for(var j of i.destination) {
          this.currentCity.destination.push({"lat":j.lat,"lon":j.lon,"title":j.title,"audiopath":j.audiopath,"imgCaption":j.img[0].caption,"imgPath":j.img[0].path});
        }
      }
     }
  }
  getCities() {
    return this.cities;
  }
}
