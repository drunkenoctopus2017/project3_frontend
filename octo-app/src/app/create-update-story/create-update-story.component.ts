import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

import {CookieService} from 'angular2-cookie';
import {StoryService} from '../_service/story.service';
import {UserService} from '../_service/user.service';

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
  story: Story;
  role: UserRole = {id: 0, name: ""};
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
   }
  
  ngOnInit() {
    const currentUser:SystemUser = this.cookieService.getObject('user');
    this.role = currentUser.role;
    this.story = this.storyService.getSelectedStory();
    const myData = this.route.data;

    console.log("myData: " + JSON.stringify(myData));
    console.log("roleFromRoute: " + this.roleFromRoute);
  }

  submitOrMakeStory(){
    this.storyService.updateStory(this.story).then(response => this.router.navigate(['/boardStoryLanes']));    
  }

  edit(){
    this.router.navigate(['/editStory']);
  }

  cancel(){
    this.router.navigate(['/boardStoryLanes']);
  }

}
