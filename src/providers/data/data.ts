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
  sitePrefix: string = "http://markaltman.ca/antitour/";
  //sitePrefix: string = "assets/";
  cities: Array<any> = []
  currentCityID: number = -1;
  currentCity: any = {};
  currentStory: number = 0;

  constructor(public http: Http, public storage:Storage) {
    this.load().then(data => {
      console.log("loading data");
      this.data = data;
      // keep data in local storage
      storage.set('localdata', JSON.stringify(this.data));
      for (var i of this.data.location) {
        let tempObj = {"name":i.name,"id":i.id,"imgCaption":i.img[0].caption,"imgPath":this.sitePrefix+i.img[0].path}
        this.cities.push(tempObj);
       }
      storage.set('cities', JSON.stringify(this.cities));
      console.log("cities length="+this.cities.length+" 1st city="+this.cities[0].name+" 2nd city="+this.cities[1].name);
    });
  }

  load(): any {
    return this.http.get(this.sitePrefix+'/data.json')
      .map(res => res.json()).toPromise();
  }

  setCurrentStory(id) {
    this.currentStory = id;
    this.storage.set("currentStory",id);
  }
  setCurrentCity(id) {
    this.currentCityID = id;
    console.log("in setCurrentCity id="+id);
    // set all city stuff
    for (var i of this.data.location) {
      console.log("passed in id was "+i+" id in loop is "+i.id+" ")
      if(i.id==id) {
        console.log("in setCurrentCity matched id");
        this.currentCity = {"name":i.name,"id":i.Id,"lat":i.lat,"lon":i.lon,"imgCaption":i.img[0].caption,"imgPath":this.sitePrefix+i.img[0].path, "destination":[]};
        
        for(var j of i.destination) {
          console.log("in destination"+i.id);
          this.currentCity.destination.push({"lat":j.dlat,"lon":j.dlon,"title":j.dtitle,"audiopath":this.sitePrefix+j.daudiopath,"imgCaption":j.dimg[0].dcaption,"imgPath":this.sitePrefix+j.dimg[0].dpath});
        }
      }
      console.log("Current city = "+JSON.stringify(this.currentCity));
      this.storage.set("currentCity",JSON.stringify(this.currentCity));
     }
     console.log("in setCurrentCity="+this.currentCity);
  }
}
