import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutMyPage } from './about-my';

@NgModule({
  declarations: [
    // AboutMyPage,  // ionic build --prod 会出问题
  ],
  imports: [
    IonicPageModule.forChild(AboutMyPage)
  ],
})
export class AboutMyPageModule { }
