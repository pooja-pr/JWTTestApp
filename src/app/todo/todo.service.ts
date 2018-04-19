import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

import { ToDoModel } from './todo.model';
import { AppService } from '../app.service';

@Injectable()
export class ToDoService {
    private user = this.appService.userObj;
    private todo: ToDoModel;
    private todoList: ToDoModel[] = [];
    private map: any[] = [];
    constructor(private http: Http, private appService: AppService) {

    }

    set mapData(value) {
        this.map = value;
    }

    get mapData() {
        return this.map;
    }
    createToDo(data): Observable<ToDoModel> {
        console.log(data)
        const headers = new Headers();
        headers.append('x-access-token', this.user.token);
        return this.http.post('http://localhost:3000/api/todo/add', data, { headers: headers })
            .map(this.extractResponse)
            .catch(this.handleError);
    }

    getToDoList(): Observable<ToDoModel[]> {
        const headers = new Headers();
        headers.append('x-access-token', this.user.token);
        return this.http.get('http://localhost:3000/api/todo', { headers: headers })
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCompletedTasks(): Observable<ToDoModel[]> {
        const headers = new Headers();
        headers.append('x-access-token', this.user.token);
        return this.http.get('http://localhost:3000/api/todo/completed', { headers: headers })
            .map(this.extractData)
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

    private extractData(res: Response) {
        const body = res.json();
        if (body.error) {
            throw (res);
        } else {
            let todos;
            todos = body.data;
            return todos;
        }
    }

    private handleError(error: Response | any) {
        const errorMsg = error.json();
        return Observable.throw(error);
    }
}
