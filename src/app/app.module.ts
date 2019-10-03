import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP } from '@ionic-native/http/ngx';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AboutPage } from '../pages/about/about';
import { DiscoveryPage } from '../pages/discovery/discovery';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RestProvider } from '../providers/rest/rest';
import { HttpApiModule } from '../service/http-api';
import { HttpSvModule } from '../service/http-service';
import { NativeModule } from '../service/native-utils';
import { UtilsModule } from '../service/utils';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    DiscoveryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpSvModule,
    HttpApiModule,
    HttpModule,
    UtilsModule,
    NativeModule,
    IonicStorageModule.forRoot(),
    IonicStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    DiscoveryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    HTTP,
    Toast
  ]
})
export class AppModule { }
