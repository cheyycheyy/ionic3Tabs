import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeUtils } from '../../service/native-utils';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public native: NativeUtils) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  onShowToast() {
    this.native.showToast("hello che");
  }

  onShowLoading() {
    this.native.showLoading("Loading...");
    // this.native.showLoading("Loading...", 0);
  }

  onShowAlter() {
    // this.native.showAlert("title", "Message");
    // this.native.showChoiceAlert("title", "Message", 'ok', () => { });
    this.native.showAlert("title", "Message", 'ok', () => { });
  }




}
