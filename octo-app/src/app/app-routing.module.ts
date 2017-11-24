import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AssignMembersMenuComponent } from './assign-members-menu/assign-members-menu.component';
import { BoardStoryLanesComponent } from './board-story-lanes/board-story-lanes.component';
import { CreateUpdateBoardComponent } from './create-update-board/create-update-board.component';
import { CreateUpdateStoryComponent } from './create-update-story/create-update-story.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';

const appRoutes:Routes = [
  {path: 'about', component: AboutComponent}, 
  {path: 'login', component: LoginComponent},
  {path: 'mainMenu', component: MainMenuComponent}, 
  {path: 'assignMembers', redirectTo: '/assignMembers/0', pathMatch: 'full' },
  {path: 'assignMembers/:id', component: AssignMembersMenuComponent}, 
  {path: 'createUpdateBoard', redirectTo: '/createUpdateBoard/true/0', pathMatch: 'full' },
  {path: 'createUpdateBoard/:status/:id', component: CreateUpdateBoardComponent}, 

  //----------------------------------------
  //I think this is how we're supposed to do it.
  /*
  The data property in the third route is a place to store arbitrary data associated with this specific route. 
  The data property is accessible within each activated route. 
  Use it to store items such as page titles, breadcrumb text, and other read-only, static data. 
  You'll use the resolve guard to retrieve dynamic data.
  */
  {path: 'createBoard', component: CreateUpdateBoardComponent, data: { mode: 'create' } },
  {path: 'updateBoard', component: CreateUpdateBoardComponent, data: { mode: 'edit' } },
  //----------------------------------------

  {path: 'boardStoryLanes', component: BoardStoryLanesComponent },
  //{path: 'boardStoryLanes/:id', component: BoardStoryLanesComponent}, 
  {path: 'createUpdateStory', redirectTo: '/createUpdateStory/0', pathMatch: 'full' },
  {path: 'createUpdateStory/:id', component: CreateUpdateStoryComponent}, 
  {path: 'burndownChart', redirectTo: '/burndownChart/0', pathMatch: 'full' },
  {path: 'burndownChart/:id', component: BurndownChartComponent}, 
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, 
  //TODO { path: '**', component: PageNotFoundComponent }
];
/*
    After the end of each successful navigation lifecycle, the router builds a tree of ActivatedRoute objects that make up the current state of the router. You can access the current RouterState from anywhere in the application using the Router service and the routerState property.
    Each ActivatedRoute in the RouterState provides methods to traverse up and down the route tree to get information from parent, child and sibling routes.
    */
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true, 
        //enableTracing: true // <-- debugging purposes only
      } 
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
