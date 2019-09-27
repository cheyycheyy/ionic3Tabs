import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpApi } from '../../service/http-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public http: HttpApi) {

  }

  ionViewDidEnter() {
    let self = this;
    self.http.getUserInfo(user => {

    });
  }

}
