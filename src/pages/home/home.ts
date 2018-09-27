import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from './../../providers/user-service/user-service';
import { AlertService } from './../../providers/alert-service/alert-service';
import {AddPersonPage} from '../add-person/add-person';
import {EditPersonPage} from '../edit-person/edit-person';

import { AgePipe } from './../../pipes/age/age';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_list:any;

  constructor(public navCtrl: NavController,public _userService:UserServiceProvider,public _alertService:AlertService) {

  }

  ionViewDidLoad(){
    console.log("ionViewDidLoad Called....");
    //this.loadData();
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter Called....");
    this.loadData();
  }


  loadData(){
    this._alertService.loading();
    this._userService.user_list().subscribe(res=>{
      console.log("user list success...");
      console.log(res);
      this.user_list=res;
      this._alertService.closeLoading();
    },error=>{
      console.log("user list error");
      console.log(error);
      this._alertService.closeLoading();
      this._alertService.simple(error.error.message);
    })
  }

  addPerson(){
    this.navCtrl.push(AddPersonPage);
  }

  editPerson(user_id){
    this.navCtrl.push(EditPersonPage,{'user_id':user_id});
  }
}
