import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  formHeader = "New Task"
  tasks = [];
  singleTask: any;
  newTask: any;
  updatedTask: any;
  constructor(private _httpService: HttpService) { }
  ngOnInit() {
    this.getAllTasks();
    this.newTask = { title: "", description: "" }
  }

  getAllTasks() {
    this._httpService.getTasks().subscribe(all_tasks => this.tasks = all_tasks['data'])
  }

  getOneTask(id: string) {
    // this._httpService.getTask(id).subscribe(task => this.task = task['data'])
    this._httpService.getTask(id).subscribe(task => this.tasks = task['data'])
  }

  createTask() {
    this._httpService.createTask(this.newTask).subscribe(task => {
      this.newTask = { title: " ", description: " " }
    })
    this.getAllTasks();
  }

  showEdit(task: any) {
    this.formHeader = task._id
    this.updatedTask = task
  }

  editTask() {
    //this.updatedTask
    console.log(this.updatedTask)
    this._httpService.editTask(this.updatedTask).subscribe(task => {
      this.tasks = task['data'] // this.task = task['data']
      this.getAllTasks();
      this.formHeader = null;
    })
  }

  deleteTask(id: string) {
    // this._httpService.deleteTask(id).subscribe(task => this.task = task['data'])
    this._httpService.deleteTask(id).subscribe(task => this.tasks = task['data'])
    this.getAllTasks();
  }

}
