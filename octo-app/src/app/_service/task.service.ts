import { Injectable } from '@angular/core';
import { Task } from '../_model/Task';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class TaskService {

  private zuulUrl: string = "http://"+environment.hostIp+":8765/";

  constructor(private http: Http) { }

   //create/update function this is on elvis-backend
   //let patrick know after you copy the method on 
   //elvis's page
   createUpdateTask(task:Task) :Promise<Task>{
    const url = this.zuulUrl+"octo-task-service/createUpdateTask/";//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, task, options)
      .toPromise()
      .then(response => response.json() as Task)
      .catch(this.handleError);
   }

   getTaskByStoryId(storyId: number) :Promise<Task[]>{
    const url = this.zuulUrl+"octo-task-service/getTaskByStoryId/"+storyId;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options)
      .toPromise()
      .then(response => response.json() as Task[])
      .catch(this.handleError);
   }

  deleteTasksByStoryId(storyId: number) {
    const url = this.zuulUrl+"octo-task-service/deleteTasksByStoryId/"+storyId;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then().catch(this.handleError);
  }

  deleteTaskById(id: number){
    const url = this.zuulUrl + "octo-task-service/deleteTaskById/"+id;//+"?access_token="+localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in task service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
