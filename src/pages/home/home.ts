import { ShowPage } from './../article/show/show';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpApi } from '../../service/http-api';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  articles: any[];
  tagName: '';

  constructor(public navCtrl: NavController,
    public http: HttpApi) {

  }

  ionViewDidEnter() {
    let self = this;
    self.http.get_articles(res => {
      // console.log(JSON.stringify(res));
      if (res.status == 1) {
        this.articles = res.data.data;
        for (let index in this.articles) {
          this.articles[index].abstract = this.articles[index].body.substring(0, 150)
            .replace(/<\/?.+?>/g, "").replace(/ /g, "").replace(/&nbsp;/g, ' ').replace(/#/g, '');
        }
      }
    });
  }

  showArticle(articleId) {
    this.navCtrl.push('ShowPage', { id: articleId });
  }

}
