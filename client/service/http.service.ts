
import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class HttpService {

	constructor(
	        private http: Http;
	) { }

	getUser(user) {
    return new Promise((resolve, reject) => {
      this.http.get('/api/users'+user.name)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUser(user) {
    return new Promise((resolve, reject) => {
      this.http.put('/api/users',user)
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


	addUser(data) {
    return new Promise((resolve, reject) => {
        this.http.post('/api/users', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
    });
  }

}
