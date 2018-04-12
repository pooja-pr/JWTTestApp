import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { UserModel } from './user.model';

@Injectable()
export class SignupService {
    private user: UserModel;
    constructor(private http: Http) {

    }
    createUser(data): Observable<UserModel> {
        return this.http.post('http://localhost:3000/signup/add', data)
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
        const errorMsg = error.json()
        return Observable.throw(error);
    }
}
