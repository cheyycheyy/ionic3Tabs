import { Component } from '@angular/core';

import { DiscoveryPage } from '../discovery/discovery';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tabHome = HomePage;
  tabDiscovery = DiscoveryPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
