import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AssignMembersMenuComponent } from './assign-members-menu/assign-members-menu.component';
import { BoardStoryLanesComponent } from './board-story-lanes/board-story-lanes.component';
import { CreateUpdateBoardComponent } from './create-update-board/create-update-board.component';
import { CreateUpdateStoryComponent } from './create-update-story/create-update-story.component';
import { BurndownChartComponent } from './burndown-chart/burndown-chart.component';
import { AuthGuard } from './_service/auth-guard.service';

const appRoutes:Routes = [ 
  {path: 'login', component: LoginComponent}, 
  {path: 'mainMenu', component: MainMenuComponent, canActivate: [AuthGuard] },
  {path: 'assignMembers', component: AssignMembersMenuComponent, canActivate: [AuthGuard] },
  {path: 'createBoard', component: CreateUpdateBoardComponent, data: { mode: 'create' }, canActivate: [AuthGuard] },
  {path: 'updateBoard', component: CreateUpdateBoardComponent, data: { mode: 'edit' }, canActivate: [AuthGuard] },
  {path: 'viewStory', component: CreateUpdateStoryComponent, data: { mode: 'view' }, canActivate: [AuthGuard] },
  {path: 'editStory', component: CreateUpdateStoryComponent, data: { mode: 'edit' }, canActivate: [AuthGuard] },
  {path: 'makeStory', component: CreateUpdateStoryComponent, data: { mode: 'make' }, canActivate: [AuthGuard] },
  {path: 'boardStoryLanes', component: BoardStoryLanesComponent, canActivate: [AuthGuard] },
  {path: 'burndownChart', component: BurndownChartComponent, canActivate: [AuthGuard] },
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
