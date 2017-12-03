import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import { CookieService } from 'angular2-cookie';
import { StoryService } from '../_service/story.service';
import { UserService } from '../_service/user.service';

import { Story } from '../_model/Story';
import { ScrumBoard } from '../_model/ScrumBoard';
import { UserRole } from '../_model/UserRole';
import { SystemUser } from '../_model/SystemUser';
import { BoardService } from '../_service/board.service';

@Component({
  selector: 'app-create-update-story',
  templateUrl: './create-update-story.component.html',
  styleUrls: ['./create-update-story.component.css']
})
export class CreateUpdateStoryComponent implements OnInit {
  board: ScrumBoard;
  story: Story = new Story();
  role: UserRole = { id: 0, name: "" };
  roleFromRoute: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService,
    private userService: UserService,
    private cookieService: CookieService,
    private boardService: BoardService
  ) {
    this.router.events.filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        this.roleFromRoute = route.root.firstChild.snapshot.data['mode'];
      });
    if(this.storyService.getMode() != null){
      console.log("setting rolefrom Route");
      this.roleFromRoute = this.storyService.getMode();
      console.log(this.roleFromRoute);
    }
  }

  ngOnInit() {
    this.role = this.cookieService.getObject('user').role;
    const myData = this.route.data;
    this.board = this.boardService.getSelectedBoard();
    // if(this.roleFromRoute == 'make') {
    //   this.story = new Story();
    //   this.story.laneId = 10;
    //   this.story.boardId = this.board.id;
    //   this.storyService.setSelectedStory(this.story);
    // } else {
    //   this.story = this.storyService.getSelectedStory();
    // }
    if (this.storyService.getMode() == 'make') {
      this.story = new Story();
      this.story.name = "";
      this.story.description = "";
      this.story.laneId = 10;
      this.story.boardId = this.board.id;
      this.storyService.setSelectedStory(this.story);
    }else {
        this.story = this.storyService.getSelectedStory();
      }
  }

  submitOrMakeStory() {
    console.log(this.story);
    this.storyService.updateStory(this.story).then(response => this.router.navigate(['/boardStoryLanes']));
  }

  edit() {
    this.storyService.setMode('edit');
    this.story = this.storyService.getSelectedStory();
    this.roleFromRoute = this.storyService.getMode();
    // this.router.navigate(['/editStory']);
  }

  cancel() {
    console.log("going back?");
    this.router.navigate(['/boardStoryLanes']);
    console.log("went back?");
  }
}
