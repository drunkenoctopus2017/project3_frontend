import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Story } from '../_model/Story';
import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';

@Injectable()
export class StoryService {

  private zuulUrl: string = "http://"+environment.hostIp+":8765/";
  private currentMode: string;
  private selectedStory: Story;
  private storiesForSelectedBoard: Story[];

  constructor(private http: Http) { }

  getMode(): string {
    return this.currentMode;
  }

  setMode(mode: string) {
    if (mode != this.currentMode) {
      this.currentMode = mode;
    }
  }

  getSelectedStory(): Story {
    return this.selectedStory;
  }

  setSelectedStory(story: Story) {
    if (story != this.selectedStory) {
      this.selectedStory = story;
    }
  }

  getStoriesForSelectedBoard(): Story[]{
    return this.storiesForSelectedBoard;
  }

  setStoriesForSelectedBoard(stories: Story[]) {
    this.storiesForSelectedBoard = stories;
  }

  getStoriesByBoardId(boardId: number): Promise<Story[]> {
    const url = this.zuulUrl + "octo-story-service/getStoriesByBoardId/" + boardId;// + "?access_token=" + localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then(response => response.json() as Story[]).catch(this.handleError);
  }

  updateStory(story: Story): Promise<Story> {
    const url = this.zuulUrl + "octo-story-service/updateStory/";// + "?access_token=" + localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, story, options).toPromise().then(response => response.json() as Story).catch(this.handleError);
  }

  deleteStory(story: Story): Promise<any> {
    let url = this.zuulUrl + "octo-story-service/deleteStory/";// + "?access_token=" + localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.post(url, story, options).toPromise().then(response => {
      url = this.zuulUrl+"octo-story-history-service/deleteStoryProfileAndEvents/" + story.id;// + "?access_token=" + localStorage.getItem('token');
      this.http.get(url, options).toPromise().then() 
    }).catch(this.handleError);
    
  }

  /*
  //Rabbit MQ messaging disabled. It simply doesn't work for what we need right now.
  updateStory(story:Story):Promise<any> {
    const url = zuulUrl+"octo-story-update-manager/updateStory/";
    return this.http.post(url, story).toPromise().catch(this.handleError);
  }
  */

  deleteStoriesByBoardId(boardId: number) {
    const url = this.zuulUrl + "octo-story-service/deleteStoriesByBoardId/" + boardId;// + "?access_token=" + localStorage.getItem('token');
    let headers: Headers = new Headers({ 
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.getItem('token') 
    });
    let options: RequestOptions = new RequestOptions({ headers: headers });
    return this.http.get(url, options).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in story service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
