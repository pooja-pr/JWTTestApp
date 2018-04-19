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
  completedList: Object[];

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
    this.todoService.getCompletedTasks().subscribe(res => {
      this.completedList = res;
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

  getCompletedTasks() {
    this.todoService.getCompletedTasks().subscribe(res => {
      if (res) {
        this.completedList = res;
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

  markComplete(event, data) {
    this.todoService.createToDo(data).subscribe(res => {
      if (res['error'] === false) {
        this.getToDo();
        this.getCompletedTasks();
        this.toastr.success('ToDo updated successfully');
      } else {
        this.toastr.error('Something went wrong');
      }
    });
  }

}
