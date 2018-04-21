import { Component, ViewChild } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform, Slides, NavParams } from 'ionic-angular';
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
  @ViewChild(Slides) slides: Slides;

  
  showSkip = true;
  dir: string = 'ltr';
  cities: Array<any> = [];
  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform, public dataProvider:DataProvider, public navParams: NavParams) {
    /* get / set data */
    this.dataProvider.storage.get('cities').then((val) => {
      this.cities = JSON.parse(val);
    });
    
    this.dir = platform.dir();
   /* this.slides = [
      {
        title: "Every Sordid Detail",
        description: "<button ion-button round>instructions</button><button ion-button round>take the anti-tour</button>",
        image: 'assets/imgs/everysordiddetail.png',
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
      }]; */
  }
  slideNext() {
    this.slides.slideNext();
  }
  startApp() {
    if(this.cities.length>1) {
      this.navCtrl.setRoot('CityPage', {}, {
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
    if(this.navParams.get('instructions')) {
      this.slides.slideNext(1);
      //this.slideNext();
    }
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
