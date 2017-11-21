import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

//Install Bootstrap and Bootstrap components according to following:
//http://www.markupjavascript.com/2017/07/how-to-add-and-use-bootstrap-in-angular-2-cli-project.html
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AssignMembersMenuComponent } from './assign-members-menu/assign-members-menu.component';
import { BoardStoryLanesComponent } from './board-story-lanes/board-story-lanes.component';
import { CreateUpdateBoardComponent } from './create-update-board/create-update-board.component';
import { CreateUpdateStoryComponent } from './create-update-story/create-update-story.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';

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
    RouterModule.forRoot([
        {path: 'about', component: AboutComponent}, 
        {path: 'login', component: LoginComponent},
        {path: 'mainMenu', component: MainMenuComponent}, 
        {path: 'assignMembers', component: AssignMembersMenuComponent}, 
        {path: 'createUpdateBoard', component: CreateUpdateBoardComponent}, 
        {path: 'boardStoryLanes', component: BoardStoryLanesComponent}, 
        {path: 'createUpdateStory', component: CreateUpdateStoryComponent}, 
        {path: 'burndownChart', component: BurndownChartComponent}
      ],
      { useHash: true }
    )
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }