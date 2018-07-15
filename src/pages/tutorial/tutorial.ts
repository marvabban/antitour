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
      /* remove this */


      /* to this */
    });
    this.dir = platform.dir();
  }
  slideNext(num) {
    this.slides.slideNext(num);
  }
  startApp() {

      this.navCtrl.push('CityPage');
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    //let title=this.navParams.get('title');
    console.log("title="+this.navParams.get('title'));
    if(this.navParams.get('title')=='Instructions') {
      this.slides.slideNext(1);
    }
    else if (this.navParams.get('title')=='Credits') {
      this.slides.slideNext(2);
      this.slides.slideNext(2);
    }
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
