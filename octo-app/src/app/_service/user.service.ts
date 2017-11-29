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

@Injectable()
export class UserService {

  constructor(private http: Http, 
              private assignMembersService: AssignMembersService,
              private storyService: StoryService,
              private taskService: TaskService,
              private boardService: BoardService,
              private cookieService: CookieService) { }

  getBoardMembersByBoardId(boardId: number): Promise<SystemUser[]> {
    const url = zuulUrl+"octo-user-management-service/getBoardMembersByBoardId/" + boardId;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as SystemUser[])
      .catch(this.handleError);
  }

  deleteBoard(boardId: number): Promise<any> {
    // Hahaha
    // octo-user-management-service/updateBoardUsers/{boardId} update this board's list of users to empty
    this.assignMembersService.updateBoardUsers(boardId, []);
    // octo-story-service/getStoriesByBoardId/{boardId} for each story on this board
    let t = this.taskService;
    let s = this.storyService;
    let b = this.boardService;
    this.storyService.getStoriesByBoardId(boardId)
      .then(response => {
        let storiesToBeDeleted: Story[] = response;
        for(var i = 0; i < storiesToBeDeleted.length; i++){
          // octo-task-service/deleteTasksByStoryId/{storyId} delete all tasks for each story
          t.deleteTasksByStoryId(storiesToBeDeleted[i].id);
        }
        // octo-story-service/deleteStoriesByBoardId/{boardId} delete all stories after deleting all tasks
        s.deleteStoriesByBoardId(boardId).then().catch(this.handleError);
        // octo-board-service/deleteBoardById/{id} delete the board
        b.deleteBoardById(boardId).then().catch(this.handleError);
      })
      .catch(this.handleError);
    // octo-user-management-service/deleteScrumBoardIdFromUser/{id} remove this board from user's list of board ID's
    let url = zuulUrl+"octo-user-management-service/deleteScrumBoardIdFromUser/"+boardId;
    let body = this.cookieService.getObject('user');
    return this.http.get(url, body).toPromise().then(() => console.log("finished deleting?")).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in user service: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
