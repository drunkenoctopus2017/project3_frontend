import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Story } from '../_model/Story';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoryService {
  private selectedStory:Story;

  constructor(private http: Http) { }

  getSelectedStory():Story {
    return this.selectedStory;
  }

  setSelectedStory(story:Story) {
    if (story != this.selectedStory) {
      this.selectedStory = story;
    }
  }

  getStoriesByBoardId(boardId: number): Promise<Story[]> {
    const url = "octo-story-service/getStoriesByBoardId/" + boardId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Story[])
      .catch(this.handleError);
  }

  getStories() : Promise<Story[]> {
    const url = "octo-story-service/getStories";
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Story[])
      .catch(this.handleError);
  }

  updateStory(story:Story): Promise<Story> {
    const url = "octo-story-service/updateStory/";
    var storyToString = JSON.stringify(story);
    console.log("storyToString: " + storyToString);
    var storyToJSON = JSON.parse(storyToString);
    console.log("storyToJSON: " +storyToJSON);
    return this.http.post(url, storyToJSON)
      .toPromise()
      .then(response => response.json() as Story)
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
