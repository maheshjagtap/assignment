import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Platform } from 'ionic-angular';
import { isString } from 'ionic-angular/util/util';
import { ConfigService } from './../config-service/config-service';
import * as moment from 'moment';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';

@Injectable()

export class ApiService {
    constructor(private http: HttpClient, private config: ConfigService,
        private platform: Platform) {

    }
    createHeader() {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json','User-Agent':'googlebot'});
        return headers;
    }

    get(endpoint: string, params?: any, reqOpts?: any) {
        let query_param = '?'
        if (!reqOpts) {
            reqOpts = {
                //headers: this.createHeader()
            };
        }

        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                console.log('key', k, 'content', params[k])
                reqOpts.params.set(k, params[k]);
                query_param += k + '=' + params[k] + '&'
            }

        }
        console.log('url', this.config.getUrl() + endpoint);
        return this.http.get(this.config.getUrl() + endpoint + query_param.substring(0, query_param.length - 1), reqOpts).timeout(this.timeout());
    }

    post(endpoint: string, body: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = { headers: this.createHeader() };
        }
        return this.http.post(this.config.getUrl() + endpoint, isString(body) ? body : JSON.stringify(body), reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = { headers: this.createHeader() };
        }
        return this.http.patch(this.config.getUrl() + endpoint, isString(body) ? body : JSON.stringify(body), reqOpts);
    }

    timeout(): number {
        return 30000
    }
}