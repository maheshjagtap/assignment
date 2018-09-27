import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';

@Injectable()
export class AlertService {
  loader: any = null;
  alert: any = null;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private network: Network) {

  }

  ///////////////////////////////
  //Toast Controller
  //////////////////////////////
  showToast(msg: string, duration: number = 3000, position: string = 'bottom') {
    let toast = this.toastCtrl.create({
      message: msg,
      position: position,
      duration: duration
    });
    toast.present();
  }

  //////////////////////////////
  ///Alert Controller
  /////////////////////////////
  simple(msg: string, title: string = 'Notice') {
    if (this.alert) {
      this.alert.dismiss();
      this.alert = null;
    }
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['Ok']
    });

    this.alert.present();
  }

  //Offline device message
  offline() {
    this.simple('Device not connected to the internet');
  }

  //Unavailable functionality alert
  unavailable() {
    this.simple('Sorry, functionality currently unavailable');
  }

  //generic Error Message
  genericErrorMsg() {
    this.simple('Check your internet connection, if the problem persists, contact your affiliate');
  }


  ////////////////////////////////
  ///Loading Controller
  ///////////////////////////////
  loading(msg: string = null) {
    if (!msg) {
      msg = 'Please wait';
      if (['2g', '3g', 'cellular'].indexOf(this.network.type) >= 0)
        msg = '<b>Conexão lenta detectada.</b> ' + msg;
    }

    if (this.loader) {
      this.loader.dismissAll();
      this.loader = null;
    }

    this.loader = this.loadingCtrl.create({
      content: msg
    })
    this.loader.present();
  }

  //closeLoading
  closeLoading() {
    if (this.loader) {
      this.loader.dismissAll();
      this.loader = null;
    }
  }
}
