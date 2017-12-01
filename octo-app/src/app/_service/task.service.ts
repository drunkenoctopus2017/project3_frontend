import { Injectable } from '@angular/core';
import { Task } from '../_model/Task';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { zuulUrl } from './zuul-url';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

   //create/update function this is on elvis-backend
   //let patrick know after you copy the method on 
   //elvis's page
   createUpdateTask(task:Task) :Promise<Task>{
    const url = zuulUrl+"octo-task-service/createUpdateTask/"+"?access_token="+localStorage.getItem('token');
    return this.http.post(url, task)
      .toPromise()
      .then(response => response.json() as Task)
      .catch(this.handleError);
   }

   getTaskByStoryId(storyId: number) :Promise<Task[]>{
    const url = zuulUrl+"octo-task-service/getTaskByStoryId/"+storyId+"?access_token="+localStorage.getItem('token');
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Task[])
      .catch(this.handleError);
   }

  deleteTasksByStoryId(storyId: number) {
    const url = zuulUrl+"octo-task-service/deleteTasksByStoryId/"+storyId+"?access_token="+localStorage.getItem('token');
    return this.http.get(url).toPromise().then().catch(this.handleError);
  }

  deleteTaskById(id: number){
    const url = zuulUrl + "octo-task-service/deleteTaskById/"+id+"?access_token="+localStorage.getItem('token');
    return this.http.get(url).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in task service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
