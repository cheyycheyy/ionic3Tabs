import { AboutMyPage } from './../about-my/about-my';
import { Component } from '@angular/core';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabAboutMy = AboutMyPage;

  constructor() {

  }
}
