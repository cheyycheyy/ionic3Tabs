import { AboutPage } from './../about/about';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutMyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-my',
  templateUrl: 'about-my.html',
})
export class AboutMyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutMyPage');
  }

  onClickAbout() {
    this.navCtrl.push("AboutPage");
  }

  onClickTest() {
    this.navCtrl.push("TestPage");
  }

}
