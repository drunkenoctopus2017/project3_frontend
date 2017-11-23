import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class StoryService {

  constructor(private http: Http) { }

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
