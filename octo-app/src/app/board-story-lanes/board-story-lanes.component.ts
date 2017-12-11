import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { CookieService } from 'angular2-cookie';
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
import { DragulaService } from 'ng2-dragula/components/dragula.provider';

import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-board-story-lanes',
  templateUrl: './board-story-lanes.component.html',
  styleUrls: ['./board-story-lanes.component.css']
})
export class BoardStoryLanesComponent implements OnInit, OnDestroy {
  
  private destroy$ = new Subject();
  
  board: ScrumBoard;
  storyLanes: StoryLane[];
  stories: Story[];
  members: SystemUser[];
  role: UserRole = { id: 0, name: "" };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private boardService: BoardService,
    public storyService: StoryService,
    private storyLaneService: StoryLaneService,
    private userService: UserService,
    private burndownChartService: BurndownChartService,
    private dragulaService: DragulaService
  ) {
    dragulaService.drag.asObservable().takeUntil(this.destroy$).subscribe((value) => {
      // console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.asObservable().takeUntil(this.destroy$).subscribe((value) => {
      // console.log(`drop: ${value[0]}`);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.asObservable().takeUntil(this.destroy$).subscribe((value) => {
      // console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    dragulaService.out.asObservable().takeUntil(this.destroy$).subscribe((value) => {
      // console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  ngOnInit() {
    const currentUser: SystemUser = this.cookieService.getObject('user');
    this.role = currentUser.role;
    // this.board = this.boardService.getSelectedBoard();
    this.board = this.cookieService.getObject('currentBoard');
    this.storyService.setSelectedStory(null);
    //There's a better way to do this, I'm sure.
    if (!this.board) {
      this.router.navigate(['/mainMenu']);
    } else {

      this.storyLanes = this.storyLaneService.getCachedStoryLanes();
      if (!this.storyLanes) {
        this.storyLaneService.getStoryLanes().then(storyLanes => {
          this.storyLanes = storyLanes;
        });
      }
      this.userService.getBoardMembersByBoardId(this.board.id).then(members => this.members = members);
      // console.log("got board members by board id");
      this.storyService.getStoriesByBoardId(this.board.id).then(stories => {
        this.storyService.setStoriesForSelectedBoard(stories);
        this.stories = this.storyService.getStoriesForSelectedBoard(); 
        console.log(this.stories); 
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  
  private onDrop(args) {
    let [e, el] = args;
    // do something
    el.appendChild(e);
    let story: Story = this.getStoryById(e.id);
    let lane: StoryLane = this.getLaneById(el.id);
    if(story.laneId != lane.id){
      this.changeLane(story, lane);
    }
  }
  
  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }
  
  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }

  /**
   * Return a YYYY/MM/DD date string with leading zeros for single digits.
   */
  private formatDateString(date: Date) {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return date.getFullYear() + "/" + (mm < 10 ? "0" + mm : mm) + "/" + (dd < 10 ? "0" + dd : dd);
  }

  getStartDateString(): string {
    const d: Date = new Date(this.board.startDate);
    return this.formatDateString(d);
  }

  getEndDateString(): string {
    const d: Date = new Date(this.board.startDate);
    d.setDate(d.getDate() + this.board.duration - 1);
    return this.formatDateString(d);
  }

  getStoriesByLane(lane: StoryLane): Story[] {
    return this.storyService.getStoriesForSelectedBoard().filter(s => s.laneId == lane.id);
  }

  getStoryById(id: number): Story {
    let stry: Story;
    for(let story of this.storyService.getStoriesForSelectedBoard()){
      if(story.id == id){
        stry = story;
      }
    }
    return stry;
  }

  getLaneById(id: number): StoryLane {
    let ln: StoryLane;
    for(let lane of this.storyLanes){
      if(lane.id == id){
        ln = lane;
      }
    }
    return ln;
  }

  createStory() {
    let story = new Story();
    story.name = "";
    story.description = "";
    story.laneId = 10;
    story.boardId = this.board.id;
    this.storyService.setSelectedStory(story);
    this.storyService.setMode('make');
  }

  selectStory(story: Story) {
    this.storyService.setSelectedStory(story);
    this.storyService.setMode('view');
    const currentUser: SystemUser = this.cookieService.getObject('user');
  }

  changeLane(story: Story, lane: StoryLane) {
    const origLaneId: number = story.laneId;
    story.laneId = lane.id;
    this.storyService.updateStory(story).catch(error => story.laneId = origLaneId);
  }

  viewChart() {
    var r = this.router;
    this.burndownChartService.getChartData(this.board)
      .then(results => {
        // console.log("done with burndown chart data");
        r.navigate(['/burndownChart']);
      });
  }

  goBackToMainMenu() {
    this.router.navigate(['/mainMenu']);
  }
}