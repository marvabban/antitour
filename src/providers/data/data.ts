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
  sitePrefix: string = "https://antitourismtour.com/app-data/";
 //sitePrefix: string = "https://anti-tourism-1512942066113.firebaseapp.com/";
  //sitePrefix: string = "assets/";
  cities: Array<any> = []
  currentCityID: number = -1;
  currentCity: any = {};
  currentStory: number = 0;

  constructor(public http: Http, public storage:Storage) {
    this.load().then(data => {
      
      this.data = data;
      // keep data in local storage
      storage.set('localdata', JSON.stringify(this.data));
      for (var i of this.data.location) {
        let tempObj = {"name":i.name,"id":i.id,"imgForMap":this.sitePrefix+i.imgForMap,"imgCaption":i.img[0].caption,"imgPath":this.sitePrefix+i.img[0].path}
        this.cities.push(tempObj);
       }
      storage.set('cities', JSON.stringify(this.cities));
    });
  }

  load(): any {
    return this.http.get(this.sitePrefix+'data/data5.json')
      .map(res => res.json()).toPromise();
  }

  setCurrentStory(id) {
    this.currentStory = id;
    this.storage.set("currentStory",id);
  }
  setCurrentCity(id) {
    this.currentCityID = id;
    // set all city stuff
    for (var i of this.data.location) {

      if(i.id==id) {
        this.currentCity = {"name":i.name,"imgForMap":this.sitePrefix+i.imgForMap,"id":i.id,"lat":i.lat,"lon":i.lon,"imgCaption":i.img[0].caption,"imgPath":this.sitePrefix+i.img[0].path, "destination":[]};

        for(var j of i.destination) {
          this.currentCity.destination.push({"lat":j.dlat,"lon":j.dlon,"title":j.dtitle,"audiopath":this.sitePrefix+j.daudiopath,"imgCaption":j.dimg[0].dcaption,"imgPath":this.sitePrefix+j.dimg[0].dpath});
        }
      }
      this.storage.set("currentCity",JSON.stringify(this.currentCity));
     }
  }
}
