import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SystemUser } from '../_model/SystemUser';

import { CookieService } from 'angular2-cookie';
import { zuulUrl } from './zuul-url';

import { Story } from '../_model/Story';
import { AssignMembersService } from './assign-members.service';
import { StoryService } from './story.service';
import { TaskService } from './task.service';
import { BoardService } from './board.service';
import { BurndownChartService } from './burndown-chart.service';

@Injectable()
export class UserService {

  constructor(private http: Http, 
              private assignMembersService: AssignMembersService,
              private storyService: StoryService,
              private taskService: TaskService,
              private boardService: BoardService,
              private burndownChartService: BurndownChartService,
              private cookieService: CookieService) { }

  getBoardMembersByBoardId(boardId: number): Promise<SystemUser[]> {
    const url = zuulUrl+"octo-user-management-service/getBoardMembersByBoardId/"+boardId+"?access_token="+localStorage.getItem('token');;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as SystemUser[])
      .catch(this.handleError);
  }

  deleteBoard(boardId: number): Promise<any> {
    // Hahaha
    let t = this.taskService;
    let s = this.storyService;
    let b = this.boardService;
    let bu = this.burndownChartService;
    let c = this.cookieService;

    // octo-user-management-service/updateBoardUsers/{boardId} update this board's list of users to empty
    let boardUsers: SystemUser[] = [];
    return this.assignMembersService.updateBoardUsers(boardId, boardUsers).then(response => {
      // octo-story-service/getStoriesByBoardId/{boardId} for each story on this board
      s.getStoriesByBoardId(boardId)
        .then(response => {
          let storiesToBeDeleted: Story[] = response;
          for(var i = 0; i < storiesToBeDeleted.length; i++){
            // octo-task-service/deleteTasksByStoryId/{storyId} delete all tasks for each story
            t.deleteTasksByStoryId(storiesToBeDeleted[i].id);
          }

          // octo-story-service/deleteStoriesByBoardId/{boardId} delete all stories after deleting all tasks
          s.deleteStoriesByBoardId(boardId);

          // octo-story-history-service/deleteStoryProfilesByBoardId/{boardId}
          bu.deleteStoryProfilesByBoardId(boardId);
          
          // octo-board-service/deleteBoardById/{id} delete the board
          b.deleteBoardById(boardId);
        })
    })
    .catch(this.handleError)
    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in user service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
