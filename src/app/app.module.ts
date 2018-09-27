import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { Network } from '@ionic-native/network';

//Pages import
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {AddPersonPage} from '../pages/add-person/add-person';
import {EditPersonPage} from '../pages/edit-person/edit-person';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Providers import
import { ApiService } from './../providers/api-service/api-service';
import {ConfigService} from './../providers/config-service/config-service';
import {AlertService} from './../providers/alert-service/alert-service';
import { UserServiceProvider } from '../providers/user-service/user-service';

//Custom Pipes import
import { AgePipe } from './../pipes/age/age';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddPersonPage,
    EditPersonPage,
    AgePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddPersonPage,
    EditPersonPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiService,
    ConfigService,
    AlertService,
    UserServiceProvider,
    Network
  ]
})
export class AppModule {}
