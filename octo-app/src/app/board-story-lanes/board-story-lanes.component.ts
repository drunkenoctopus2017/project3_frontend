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
import { UserRole } from '../_model/UserRole';
import { BurndownChartService } from '../_service/burndown-chart.service';

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
  role: UserRole = {id: 0, name: ""};

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private cookieService: CookieService, 
    private boardService: BoardService,
    private storyService: StoryService, 
    private storyLaneService: StoryLaneService, 
    private userService: UserService, 
    private burndownChartService: BurndownChartService
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
    const currentUser:SystemUser = this.cookieService.getObject('user');
    this.role = currentUser.role;
    this.board = this.boardService.getSelectedBoard();
    
    //There's a better way to do this, I'm sure.
    if (!this.board) {
      this.router.navigate(['/mainMenu']);
    } else {
      
      this.storyLanes = this.storyLaneService.getCachedStoryLanes();
      if (!this.storyLanes) {
        this.storyLaneService.getStoryLanes().then(storyLanes => this.storyLanes = storyLanes);
      }
      this.userService.getBoardMembersByBoardId(this.board.id).then(members => this.members = members);
      this.storyService.getStoriesByBoardId(this.board.id).then(stories => this.stories = stories);
    }
  }

  getStoriesByLane(lane:StoryLane):Story[] {
    return this.stories.filter(s => s.laneId == lane.id);
  }

  createStory() {
    this.router.navigate(['/createStory']);
  }

  selectStory(story:Story) {
    this.storyService.setSelectedStory(story);
    const currentUser:SystemUser = this.cookieService.getObject('user');
    if (currentUser.role.id > 100) {
      this.router.navigate(['/editStory']);
    } else {
      this.router.navigate(['/viewStory']);
    }
  }

  changeLane(story:Story, lane:StoryLane) {
    const origLaneId:number = story.laneId;
    story.laneId = lane.id;
    this.storyService.updateStory(story).catch(error => story.laneId = origLaneId);
  }

  viewChart() {
    this.burndownChartService.getChartData(this.board).then(results => console.log("done with burndown chart data"));
    
  }
}
