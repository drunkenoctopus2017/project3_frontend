import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import {CookieService} from 'angular2-cookie';
import { BoardService } from '../_service/board.service';
import { StoryService } from '../_service/story.service';
import { StoryLaneService } from '../_service/story-lane.service';

import { SystemUser } from '../_model/SystemUser';
import { ScrumBoard } from '../_model/ScrumBoard';
import { StoryLane } from '../_model/StoryLane';
import { UserService } from '../_service/user.service';
import { Story } from '../_model/Story';

@Component({
  selector: 'app-board-story-lanes',
  templateUrl: './board-story-lanes.component.html',
  styleUrls: ['./board-story-lanes.component.css'], 
})

export class BoardStoryLanesComponent implements OnInit {
  board: ScrumBoard;
  storyLanes: StoryLane[];
  stories: Story[];
  members: SystemUser[];
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private cookieService: CookieService, 
    private boardService: BoardService,
    private storyService: StoryService, 
    private storyLaneService: StoryLaneService, 
    private userService: UserService
  ) {
    
  }
  
  /**
   * Return a YYYY/MM/DD date string with leading zeros for single digits.
   */
  getDateString(): string {
    const d: Date = new Date(this.board.startDate);
    let mm = d.getMonth() + 1;
    let dd = d.getDate();
    return d.getFullYear() + "/" + (mm < 10 ? "0" + mm : mm) + "/" + (dd < 10 ? "0" + dd : dd);
  }
  
  ngOnInit() {
    
    this.board = this.boardService.getSelectedBoard();
    
    //There's a better way to do this, I'm sure.
    if (!this.board) {
      this.router.navigate(['/mainMenu']);
    } else {
      //TODO cache this data in cookie
      //this.storyLanes = this.cookieService.getObject('storyLanes');
      //if (!this.storyLanes) {
      this.storyLaneService.getStoryLanes().then(storyLanes => this.storyLanes = storyLanes);
      //}
      this.userService.getBoardMembersByBoardId(this.board.id).then(members => this.members = members);
    }
  }

  getStoriesByLane(lane:StoryLane):Story[] {
    return this.stories.filter(s => s.laneId == lane.id);
  }
}
