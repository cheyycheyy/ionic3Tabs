import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutMyPage } from './about-my';

@NgModule({
  declarations: [
    AboutMyPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutMyPage)
  ],
})
export class AboutMyPageModule { }
