import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  constructor(private _http: HttpClient) { }
    getTasks(){
    return this._http.get('/tasks');
  }
  getTask(id:string){
    return this._http.get('/' + id);
  }
  createTask(task: any){
    return this._http.post('/tasks', task);
  }
  editTask(task:any){
    return this._http.put('/tasks/' + task._id, task);
  }
  deleteTask(id:string){
    return this._http.delete('/tasks/' + id);
  }
}