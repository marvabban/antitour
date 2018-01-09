import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  json: any;
  cities: Array<any> = [];
  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform, public dataProvider:DataProvider) {
    console.log("in constructor");
    this.dir = platform.dir();
    this.slides = [
      {
        title: "Tutorial",
        description: "This is the first page of the tutorial!<br>Swipe, or use the nav thingy below to view the next page of instructions.",
        image: 'assets/img/ica-slidebox-img-1.png',
      },
      {
        title: "More Tutorial",
        description: "Don't worry, We will replace this with real instructions later.",
        image: 'assets/img/ica-slidebox-img-2.png',
      },
      {
        title: "Even more tutorial",
        description: "We can also set this tutorial to only be displayed the first time they use the app. It could be accessed again in a menu maybe?",
        image: 'assets/img/ica-slidebox-img-3.png',
      }];
  }

  startApp() {
    if(this.cities.length>1) {
      this.navCtrl.setRoot('SpotGroupPage', {}, {
        animate: true,
        direction: 'forward'
      });
    }
    else {
      this.navCtrl.setRoot('MapPage', {}, {
        animate: true,
        direction: 'forward'
      });
    }
    
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    console.log("in startapp");
    this.dataProvider.load().then(data => {
      console.log("loading data");
      this.json = data;
      this.dataProvider.setData(this.json);
      for (var i of this.json.location) {
        let tempObj = {"name":i.name,"id":i.Id,"imgCaption":i.img[0].caption,"imgPath":i.img[0].path}
        this.cities.push(tempObj);
       }
      this.dataProvider.setCities(this.cities);
      console.log("cities length="+this.cities.length+" 1st city="+this.cities[0]+" 2nd city="+this.cities[1]);
    });
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
