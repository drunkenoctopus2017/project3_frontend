import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ChartsModule } from 'ng2-charts/ng2-charts';

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
    ChartsModule,
    AngularMultiSelectModule,
    AngularFontAwesomeModule, 
    AppRoutingModule
    
  ],

  providers: [CookieService, LoginService, UserService, BoardService, StoryService, StoryLaneService, AssignMembersService],
  bootstrap: [AppComponent]
})


export class AppModule { }