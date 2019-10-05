import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpApi } from '../../../service/http-api';
import Marked from 'marked'

import { DomSanitizer } from '@angular/platform-browser';
import hljs from 'highlight.js'

/**
 * Generated class for the ShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {

  article: any;
  markdownString: string;

  constructor(public navCtrl: NavController
    , public navParams: NavParams
    , public http: HttpApi
    , public sanitizer: DomSanitizer) {
    let id = navParams.get('id');
    let self = this;
    self.http.get_article(id, res => {
      if (res.status == 1) {
        this.article = res.data;
        this.markdownString = Marked(this.article.body);
        // console.log(JSON.stringify(this.article));
      }
    });

    Marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }

  ionViewDidLoad() {

  }

  assembleHTML() {
    return this.sanitizer.bypassSecurityTrustHtml(this.markdownString);
  }


}
