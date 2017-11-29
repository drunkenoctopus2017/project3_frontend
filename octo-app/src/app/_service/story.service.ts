import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Story } from '../_model/Story';

@Injectable()
export class StoryService {

  // zuulUrl: string = "";
  zuulUrl: string = "http://localhost:8765/";

  private selectedStory:Story;

  constructor(private http: Http) { }
  
  getSelectedStory():Story {
    return this.selectedStory;
  }

  setSelectedStory(board:Story) {
    if (board != this.selectedStory) {
      this.selectedStory = board;
    }
  }

  getStoriesByBoardId(boardId:number): Promise<Story[]> {
    const url = this.zuulUrl+"octo-story-service/getStoriesByBoardId/" + boardId;
    return this.http.get(url).toPromise().then(response => response.json() as Story[]).catch(this.handleError);
  }

  //updateStory(story:Story): Promise<Story> {
  updateStory(story:Story): Promise<string> {
    //const url = this.zuulUrl+"octo-story-service/updateStory/";
    const url = this.zuulUrl + "octo-story-update-manager/updateStory/";
    return this.http.post(url, story).toPromise().then(response => response.json() as Story).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
