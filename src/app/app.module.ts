import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { HttpSvModule } from '../service/http-service';
import { NativeModule } from '../service/native-utils';
import { UtilsModule } from '../service/utils';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpApi } from '../providers/http-api';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true'         //隐藏全部子页面tabs
    }),
    HttpSvModule,
    HttpModule,
    UtilsModule,
    NativeModule,
    IonicStorageModule.forRoot(),
    IonicStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HTTP,
    Toast,
    HttpApi
  ]
})
export class AppModule { }
