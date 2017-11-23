import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';
import {CookieService} from 'angular2-cookie';
import { BoardService } from '../_service/board.service';
import { StoryService } from '../_service/story.service';
import { StoryLaneService } from '../_service/story-lane.service';

import { SystemUser } from '../_model/SystemUser';
import { ScrumBoard } from '../_model/ScrumBoard';
import { StoryLane } from '../_model/StoryLane';



@Component({
  selector: 'app-board-story-lanes',
  templateUrl: './board-story-lanes.component.html',
  styleUrls: ['./board-story-lanes.component.css'], 
  providers: [BoardService]
})
export class BoardStoryLanesComponent implements OnInit {
  
  boardID: number;
  board: ScrumBoard;
  storyLanes: StoryLane[];
  members: SystemUser[];

  constructor(
    private route: ActivatedRoute, 
    private cookieService: CookieService, 
    private boardService: BoardService,
    private storyService: StoryService, 
    private storyLaneService: StoryLaneService
  ) {}

  getSelectedBoard(): void {
    //this.heroes = this.heroService.getHeroes();
    //this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    this.boardService.getBoardById(this.boardID).then(board => this.board = board);
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
    this.route.params.subscribe(
      (params: Params) => {
        this.boardID = params["id"];
        this.getSelectedBoard();
      }
    );
    /*
    this.board = {
      id: 1, 
      name: "My Scrum Board", 
      startDate: new Date(), 
      duration: 14
    }
    */

    //TODO cache this data in cookie
    //this.storyLanes = this.cookieService.getObject('storyLanes');
    //if (!this.storyLanes) {
      this.storyLaneService.getStoryLanes().then(storyLanes => this.storyLanes = storyLanes);
    //}

    this.members = [
      {
        id: 1, 
        username: "username", 
        password: "password", 
        firstName: "Test", 
        lastName: "User", 
        role: {
          id: 100, name: "Member"
        }, 
        enabled: true, 
        credentialsNonExpired: true, 
        accountNonExpired: true, 
        accountNonLocked: true
      }, 
      {
        id: 2, 
        username: "username1", 
        password: "password1", 
        firstName: "Test1", 
        lastName: "User1", 
        role: {
          id: 100, name: "Member"
        }, 
        enabled: true, 
        credentialsNonExpired: true, 
        accountNonExpired: true, 
        accountNonLocked: true
      }
    ];
  }

}
