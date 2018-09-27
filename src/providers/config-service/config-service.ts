import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform } from 'ionic-angular';



@Injectable()
export class ConfigService {
    private urlDev: string = "https://tekdi-challenges.appspot.com/api/";
    constructor(private platform: Platform, private http: HttpClient) {
    }

    //get API Base url
    getUrl() {
        return this.urlDev;
    }
}