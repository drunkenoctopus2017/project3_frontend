import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Install Bootstrap and Bootstrap components according to following:
//http://www.markupjavascript.com/2017/07/how-to-add-and-use-bootstrap-in-angular-2-cli-project.html
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { CookieService } from 'angular2-cookie';

import { BoardService } from './_service/board.service';
import { LoginService } from './_service/login.service';
import { StoryService } from './_service/story.service';
import { StoryLaneService } from './_service/story-lane.service';
import { AssignMembersService } from './_service/assign-members.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AssignMembersMenuComponent } from './assign-members-menu/assign-members-menu.component';
import { BoardStoryLanesComponent } from './board-story-lanes/board-story-lanes.component';
import { CreateUpdateBoardComponent } from './create-update-board/create-update-board.component';
import { CreateUpdateStoryComponent } from './create-update-story/create-update-story.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';

import { UserService } from './_service/user.service';


import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BurndownChartService } from './_service/burndown-chart.service';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
    MainMenuComponent,
    CreateUpdateBoardComponent,
    CreateUpdateStoryComponent,
    AssignMembersMenuComponent,
    BoardStoryLanesComponent,
    BurndownChartComponent
  ],
  imports: [
    NgbModule.forRoot(), 
    BrowserModule, 
    FormsModule, 
    HttpModule, 
    AngularMultiSelectModule,
    AngularFontAwesomeModule, 
    AppRoutingModule,
    RouterModule.forRoot([
        {path: 'about', component: AboutComponent}, 
        {path: 'login', component: LoginComponent},
        {path: 'mainMenu', component: MainMenuComponent}, 
        {path: 'assignMembers', redirectTo: '/assignMembers/0', pathMatch: 'full' },
        {path: 'assignMembers/:id', component: AssignMembersMenuComponent}, 
        {path: 'createUpdateBoard', redirectTo: '/createUpdateBoard/true/0', pathMatch: 'full' },
        {path: 'createUpdateBoard/:status/:id', component: CreateUpdateBoardComponent}, 
        {path: 'boardStoryLanes', redirectTo: '/boardStoryLanes/0', pathMatch: 'full' },
        {path: 'boardStoryLanes/:id', component: BoardStoryLanesComponent}, 
        {path: 'createUpdateStory', redirectTo: '/createUpdateStory/0', pathMatch: 'full' },
        {path: 'createUpdateStory/:id', component: CreateUpdateStoryComponent}, 
        {path: 'burndownChart', redirectTo: '/burndownChart/0', pathMatch: 'full' },
        {path: 'burndownChart/:id', component: BurndownChartComponent}
      ],
      { useHash: true }
    )
  ],
  providers: [AssignMembersService, CookieService, LoginService, UserService, BoardService, StoryService, StoryLaneService, BurndownChartService],
  bootstrap: [AppComponent]
})


export class AppModule { }