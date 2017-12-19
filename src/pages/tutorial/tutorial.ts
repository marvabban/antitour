import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform) {
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
    console.log("in startapp");
    this.navCtrl.setRoot('MapPage', {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
