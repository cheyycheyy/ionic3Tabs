import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscoveryPage } from './discovery';

@NgModule({
  declarations: [
    // DiscoveryPage,   // ionic build --prod出问题
  ],
  imports: [
    IonicPageModule.forChild(DiscoveryPage),
  ],
})
export class DiscoveryPageModule { }
