import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from './../../providers/alert-service/alert-service';
import { UserServiceProvider } from './../../providers/user-service/user-service';

@IonicPage()

@Component({
  selector: 'page-edit-person',
  templateUrl: 'edit-person.html',
})
export class EditPersonPage {

  editPersonForm: FormGroup;
  name: AbstractControl;
  dob: AbstractControl;
  email: AbstractControl;
  country: AbstractControl;
  avatar:AbstractControl;
  isLoadData: boolean = false;
  user_id:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    public _alertService:AlertService,public _userService:UserServiceProvider) {

      this.user_id=this.navParams.get('user_id');


    this.editPersonForm = formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])],
      'email':['',Validators.compose([Validators.email])],
      'country':['',Validators.compose([Validators.required])],
      'avatar':['',Validators.compose([Validators.required])]
    })

    this.name = this.editPersonForm.controls['name'];
    this.dob = this.editPersonForm.controls['dob'];
    this.email=this.editPersonForm.controls['email'];
    this.country=this.editPersonForm.controls['country'];
    this.avatar=this.editPersonForm.controls['avatar'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPersonPage');
    this.loadData();
  }
  
  loadData(){
    this._alertService.loading();
    this._userService.user_details(this.user_id).subscribe(res=>{
      console.log("user_details:",res);
      this.editPersonForm.controls['name'].setValue(res.name);
      this.editPersonForm.controls['dob'].setValue(res.dob);
      this.editPersonForm.controls['email'].setValue(res.email);
      this.editPersonForm.controls['country'].setValue(res.country);
      this.editPersonForm.controls['avatar'].setValue(res.avatar);
      this._alertService.closeLoading();
      this.isLoadData=true;
    },err=>{
      console.log("user details error",err);
      this._alertService.closeLoading();
      this._alertService.simple(err.error.message);
      this.isLoadData=true;
    })
  }

  onSend(valor: any): void {
    if (!this.editPersonForm.valid) {
      return
    }
    this._alertService.loading();
    
    this._userService.update_user(valor,this.user_id).subscribe(res=>{
      this._alertService.showToast("User updated successfully.");
      setTimeout(()=>{
        this.navCtrl.pop();
      },2000);
      this._alertService.closeLoading();
    },error=>{
      this._alertService.simple(error.error.message);
      this._alertService.closeLoading();
    })
  }
}
