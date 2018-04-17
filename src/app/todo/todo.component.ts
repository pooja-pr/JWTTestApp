import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { ToDoModel } from './todo.model';
import { ToDoService } from './todo.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: ToDoModel;
  todoList: Object[];
  doneList: ['abc'];

  constructor(private http: HttpClient,
    private todoService: ToDoService,
    private toastr: ToastsManager,
    private router: Router,
    private appService: AppService) { }

  ngOnInit() {
    this.todo = new ToDoModel();
    this.todoService.getToDoList().subscribe(res => {
      this.todoList = res;
    });
  }

  addToDo() {
    this.todoService.createToDo(this.todo).subscribe(res => {
      if (res['error'] === false) {
        this.getToDo();
        this.toastr.success('ToDo added successfully');
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

  getToDo() {
    this.todoService.getToDoList().subscribe(res => {
      if (res) {
        this.todoList = res;
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

  markComplete() {
    this.todoService.updateToDo(this.todoList).subscribe(res => {
      if (res['error'] === false) {
        this.getToDo();
        this.toastr.success('ToDo updated successfully');
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

}
