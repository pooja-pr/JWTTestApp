import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';
import { UsersModel } from './users.model';


@Injectable()
export class LoginService {
    private user: UsersModel;
    constructor(private http: Http) {

    }
    login(data): Observable<UsersModel> {
        console.log(data)
        return this.http.post('http://localhost:3000/login', data)
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    private extractResponse(res: Response) {
        const body = res.json();
        if (body.error) {
            return body;
        } else {
            return body || body.json();
        }
    }
    private handleError(error: Response | any) {
        const errorMsg = error.json();
        return Observable.throw(error);
    }

    get userData(): UsersModel {
        this.user = JSON.parse(localStorage.getItem('user'))
        return this.user;
    }
    set userData(value: UsersModel) {
        this.user = value;
        localStorage.setItem('user', JSON.stringify(this.user));
    }
}
