import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './../api-service/api-service';

@Injectable()
export class UserServiceProvider {

  constructor(public http: HttpClient, public _apiService: ApiService) {
    console.log('Hello UserServiceProvider Provider');
  }

  ///////////////////////////
  ///User List API
  ///////////////////////////
  user_list() {
    return this._apiService.get('People', {}).map((resp: any) => resp);
  }

  ///////////////////////////
  ///User Details API
  ///////////////////////////
  user_details(user_id:any){
    return this._apiService.get('People/'+user_id).map((resp:any)=>resp);
  }

  ///////////////////////////
  ///Add User API
  ///////////////////////////
  add_user(data:any){
    return this._apiService.post('People',data).map((resp:any)=>resp);
  }

  ///////////////////////////
  ///Update User API
  ///////////////////////////
  update_user(data:any,user_id){
    console.log("update user data...");
    console.log(data);
    return this._apiService.put('People/'+user_id,data).map((resp:any)=>resp);
  }


  

}
