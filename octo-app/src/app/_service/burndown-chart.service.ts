import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ScrumBoard } from '../_model/ScrumBoard';

import { zuulUrl } from './zuul-url';
import { StoryService } from './story.service';
import { Story } from '../_model/Story';

@Injectable()
export class BurndownChartService {

    private burndownChartDatasource: Object;

    constructor(private http: Http, private storyService: StoryService) { }

    getChartData(board: ScrumBoard): Promise<any> {
        return this.getStoriesByBoardId(board).then(
            //storyProfiles => this.setBurndownChartDatasource(this.flattenChartData(storyProfiles, board))
            storyProfiles => this.flattenChartData(storyProfiles, board)
        );
    }

    /**
     * Returns {
     *    data: array of {x, y}
     *    maxY: total points of the story
     * }
     */
    getStoriesByBoardId(board: ScrumBoard): Promise<object[]> {
        const url = zuulUrl + "octo-story-history-service/getStoryProfilesByBoardId/" + board.id + "?access_token=" + localStorage.getItem('token');
        return this.http.get(url).toPromise().then(response => response.json() || []).catch(this.handleError);
    }

/**
 * Take JSON objects and parse them into a set of x, y coordinates to display on a chart.
 * 
 * @param storyProfiles {id, points, storyEvents: [{id, done, modifiedDate}]}
 * @param board {id, duration}
 * 
 * @return {maxY, chartData: [{x, y}]}
 */
private flattenChartData(storyProfiles: any[], board: ScrumBoard): object {
  let chartData: object[] = new Array<object>();
  //initialize the data.
  while (chartData.length < board.duration) {
    chartData.push({ x: chartData.length + 1, y: 0 });
  }
  let totalPoints: number = 0;
  const ONE_DAY: number = 86400000;
  const startDate: number = board.startDate;
  const startDay: number = Math.floor(board.startDate / ONE_DAY);
  const n: number = storyProfiles.length;
  for (let i: number = 0; i < n; i++) {
    let storyProfile: any = storyProfiles[i];
    totalPoints += storyProfile.points;
    let done: number = 0; //0 or 1 for true/false
    let lastUpdateIndex = 0;
    let storyEvents: any[] = (storyProfile.storyEvents as any[]).sort((a, b) => (a.modifiedDate - b.modifiedDate));
    const m: number = storyEvents.length;
    for (let j: number = 0; j < m; j++) {
      let storyEvent: any = storyEvents[j];
      if (done != storyEvent.done) {
        //Value has changed since previous update
        //Prepare to update previous indexes UP TO THIS POINT
        let eventDay: number = Math.floor(storyEvent.modifiedDate / ONE_DAY);
        let updateIndex: number = eventDay - startDay;
        while (lastUpdateIndex < updateIndex) {
          chartData[lastUpdateIndex++]["y"] += storyProfile.points - (done * storyProfile.points);
        }
        done = storyEvent.done;
      }
    }
    while (lastUpdateIndex < board.duration) {//daysBetween(new Date(),new Date(board.startDate) )) {
      chartData[lastUpdateIndex++]["y"] += storyProfile.points - (done * storyProfile.points);
    }
  }
  return {
    data: chartData,
    maxY: totalPoints
  }
}

    //TODO parse data along the following: 
    /*
    from this:
    [
    {
        "id": 1,
        "boardId": 1,
        "points": 1,
        "storyEvents": [
            {
                "id": 10,
                "done": 0,
                "modifiedDate": 1509574175000
            },
            {
                "id": 11,
                "done": 1,
                "modifiedDate": 1509660575000
            }
        ]
    },
    {
        "id": 2,
        "boardId": 1,
        "points": 2,
        "storyEvents": [
            {
                "id": 12,
                "done": 0,
                "modifiedDate": 1509574175000
            },
            {
                "id": 13,
                "done": 1,
                "modifiedDate": 1509746975000
            }
        ]
    },
    {
        "id": 3,
        "boardId": 1,
        "points": 3,
        "storyEvents": [
            {
                "id": 14,
                "done": 0,
                "modifiedDate": 1509574175000
            },
            {
                "id": 15,
                "done": 1,
                "modifiedDate": 1509833375000
            }
        ]
    },
    {
        "id": 4,
        "boardId": 1,
        "points": 4,
        "storyEvents": [
            {
                "id": 16,
                "done": 0,
                "modifiedDate": 1509574175000
            },
            {
                "id": 17,
                "done": 1,
                "modifiedDate": 1509923375000
            }
        ]
    },
    //into this:
    data:[{x:0,y:66},
          {x:1,y:56},
          //{x:2,y:56},
          {x:3,y:51},
          {x:4,y:40},
          //{x:5,y:40},
          {x:6,y:35},
          //{x:7,y:35},
          //{x:8,y:35},
          {x:9,y:25},
          //{x:10,y:25},
          {x:11,y:10},
          //{x:12,y:10},
          {x:13,y:5},
          // {x:14,y:5},
          {x:18,y:30}]*/

    deleteStoryProfilesByBoardId(boardId: number) {
        const url = zuulUrl + "octo-story-history-service/deleteStoryProfilesByBoardId/" + boardId + "?access_token=" + localStorage.getItem('token');
        return this.http.get(url).toPromise().then().catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}

function daysBetween(date1: Date, date2: Date) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.floor(difference_ms / one_day);
}