import { Component, ViewChild } from '@angular/core';
import { IonicPage,  NavController, NavParams, Platform} from 'ionic-angular';
import { DataProvider } from './../../providers/data/data';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@IonicPage()
@Component({
  selector: 'page-story',
  templateUrl: 'story.html'
})
export class StoryPage {
  @ViewChild("source") source;
  @ViewChild("bgimage") bgimage;
  public city: any;
  public destination: any;
  public trackpath: SafeResourceUrl;
  public tracktitle: string = "";
  public imagePath: string = "";
  public localPlatform: any;
  public imageWidth: number = 0;
  public imageHeight: number = 0;
  public deviceWidth: number = 0;
  public deviceHeight: number = 0;
  public imgSizeRatio: number = 0;
  public deviceSizeRatio: number = 0;
  public imgWidth=100;
  public imgHeight=100;
  public orientation: any;
  
  constructor(public navCtrl: NavController, screenOrientation: ScreenOrientation, platform: Platform, public dataProvider:DataProvider, public sanitizer: DomSanitizer, public navParams: NavParams) {
    let id = this.navParams.get('index')
    this.localPlatform = platform;
    this.orientation = screenOrientation;
    dataProvider.storage.get('currentCity').then((val) => {
      this.city = JSON.parse(val);
      this.tracktitle = this.city.destination[id].title;
      this.trackpath = this.sanitizer.bypassSecurityTrustResourceUrl(this.city.destination[id].audiopath);
      //this.bgimage.src
      this.imagePath = this.city.destination[id].imgPath;
      this.bgimage.onload = () => { this.getSizes(); }
    });
  }
  getSizes() {
    console.log("width="+this.bgimage.nativeElement.clientWidth);
    this.localPlatform.ready().then((readySource) => {
      this.deviceWidth = this.localPlatform.width();
      this.deviceHeight = this.localPlatform.height()-56; // header is 56 pixels - lazy coding, should be fetching it
      this.imageWidth = this.bgimage.nativeElement.width;
      this.imageHeight = this.bgimage.nativeElement.height;
      this.deviceSizeRatio = this.deviceWidth/this.deviceHeight;
      this.imgSizeRatio = this.imageWidth/this.imageHeight;
      this.sizeImage();
    });
  }
  sizeImage() {
    /* this will work if width & height changes due to orientation */
    this.deviceWidth = this.localPlatform.width();
    this.deviceHeight = this.localPlatform.height()-56; // header is 56 pixels - lazy coding, should be fetching it
    this.deviceSizeRatio = this.deviceWidth/this.deviceHeight;
    if(this.imgSizeRatio > this.deviceSizeRatio) {
      this.imgHeight = this.deviceHeight;
      this.imgWidth = this.deviceHeight*this.imgSizeRatio;
    }
    else {
      this.imgWidth = this.deviceWidth;
      this.imgHeight = this.deviceWidth / this.imgSizeRatio;
    }
  }
}