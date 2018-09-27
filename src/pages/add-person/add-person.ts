import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AlertService } from '../../providers/alert-service/alert-service';
import { UserServiceProvider } from './../../providers/user-service/user-service';


@IonicPage()
@Component({
  selector: 'page-add-person',
  templateUrl: 'add-person.html',
})
export class AddPersonPage {

  addPersonForm: FormGroup;
  name: AbstractControl;
  dob: AbstractControl;
  email: AbstractControl;
  country: AbstractControl;
  avatar:AbstractControl;
  maxDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder,
    public _alertService: AlertService, public _userService: UserServiceProvider) {

    this.maxDate = new Date().toISOString();  

    this.addPersonForm = formBuilder.group({
      'name': ['', Validators.compose([Validators.required])],
      'dob': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.email])],
      'country': ['', Validators.compose([Validators.required])],
      'avatar':['',Validators.compose([Validators.required])]
    })

    this.name = this.addPersonForm.controls['name'];
    this.dob = this.addPersonForm.controls['dob'];
    this.email = this.addPersonForm.controls['email'];
    this.country = this.addPersonForm.controls['country'];
    this.avatar=this.addPersonForm.controls['avatar'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPersonPage');
  }

  onSend(valor: any): void {
    if (!this.addPersonForm.valid) {
      return
    }
    this._alertService.loading();
    this._userService.add_user(valor).subscribe(res => {
      this._alertService.showToast("User added successfully.");
      setTimeout(() => {
        this.navCtrl.pop();
      }, 2000);
      this._alertService.closeLoading();
    }, error => {
      this._alertService.simple(error.error.message);
      this._alertService.closeLoading();
    })
  }

}
