import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
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
  @Input() modal: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService,
    private userService: UserService,
    private cookieService: CookieService,
    private boardService: BoardService,
    private elRef: ElementRef
  ) {  }

  ngOnInit() {
    this.role = this.cookieService.getObject('user').role;
    this.board = this.cookieService.getObject('currentBoard');
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
    this.storyService.updateStory(this.story).then(response => {
      if(this.storyService.getMode() === 'make'){
        this.storyService.getStoriesForSelectedBoard().push(this.story);
      }
    });
  }

  edit() {
    this.storyService.setMode('edit');
    this.story = this.storyService.getSelectedStory();
    this.roleFromRoute = this.storyService.getMode();
  }

  deleteStory(story: Story) {
    this.storyService.deleteStory(story).then(response => {
      for(var i = 0; i < this.storyService.getStoriesForSelectedBoard().length; i++){
        if(this.storyService.getStoriesForSelectedBoard()[i].id === story.id){
          this.storyService.getStoriesForSelectedBoard().splice(i,1);
        }
      }
    })
  }
}
