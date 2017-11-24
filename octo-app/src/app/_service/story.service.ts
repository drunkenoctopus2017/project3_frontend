import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Story } from '../_model/Story';

@Injectable()
export class StoryService {

  constructor(private http: Http) { }
  
  getStoriesByBoardId(boardId:number): Promise<Story[]> {
    const url = "octo-story-service/getStoriesByBoardId/" + boardId;
    return this.http.get(url).toPromise().then(response => response.json() as Story[]).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
