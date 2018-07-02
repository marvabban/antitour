import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { FirstRunPage } from '../pages/pages';

@Component({
  template: `<ion-menu [content]="content">
    

    <ion-content>
      <ion-list>
        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
          {{p.title}}
        </button>
      </ion-list>
    </ion-content>

  </ion-menu>
  <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'Instructions', component: 'TutorialPage' },
    { title: 'Locations', component: 'CityPage' },
    { title: 'Credits', component: 'TutorialPage' }
  ]



  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component,{'instructions':true});
  }
}
