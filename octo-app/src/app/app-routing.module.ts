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
import { AuthGuard } from './_service/auth-guard.service';

const appRoutes:Routes = [
  {path: 'about', component: AboutComponent}, 
  {path: 'login', component: LoginComponent},
<<<<<<< HEAD
  {path: 'mainMenu', component: MainMenuComponent, canActivate: [AuthGuard]}, 
  {path: 'assignMembers/:id', component: AssignMembersMenuComponent, canActivate: [AuthGuard]}, 
  {path: 'createUpdateBoard', redirectTo: '/createUpdateBoard/true/0', pathMatch: 'full' },
  {path: 'createUpdateBoard/:status/:id', component: CreateUpdateBoardComponent}, 
=======
  {path: 'mainMenu', component: MainMenuComponent}, 
  {path: 'assignMembers', component: AssignMembersMenuComponent},
>>>>>>> be7c5dfebf2d8d1f6a5ecb3dd1d78c64e6ecaa40

  //----------------------------------------
  //I think this is how we're supposed to do it.
  /*
  The data property in the third route is a place to store arbitrary data associated with this specific route. 
  The data property is accessible within each activated route. 
  Use it to store items such as page titles, breadcrumb text, and other read-only, static data. 
  You'll use the resolve guard to retrieve dynamic data.
  */
<<<<<<< HEAD
  {path: 'createBoard', component: CreateUpdateBoardComponent, data: { mode: 'create' }, canActivate: [AuthGuard] },
  {path: 'updateBoard', component: CreateUpdateBoardComponent, data: { mode: 'edit' }, canActivate: [AuthGuard] },

  {path: 'viewStory', component: CreateUpdateBoardComponent, data: { mode: 'view' }, canActivate: [AuthGuard] },
  {path: 'editStory', component: CreateUpdateBoardComponent, data: { mode: 'edit' }, canActivate: [AuthGuard] },
  {path: 'makeStory', component: CreateUpdateBoardComponent, data: { mode: 'make' }, canActivate: [AuthGuard] },
  //----------------------------------------

  {path: 'boardStoryLanes', component: BoardStoryLanesComponent, canActivate: [AuthGuard] },
  {path: 'burndownChart', redirectTo: '/burndownChart/0', pathMatch: 'full', canActivate: [AuthGuard] },
  {path: 'burndownChart/:id', component: BurndownChartComponent}, 
=======
  {path: 'createBoard', component: CreateUpdateBoardComponent, data: { mode: 'create' } },
  {path: 'updateBoard', component: CreateUpdateBoardComponent, data: { mode: 'edit' } },
  {path: 'viewStory', component: CreateUpdateStoryComponent, data: { mode: 'view' } },
  {path: 'editStory', component: CreateUpdateStoryComponent, data: { mode: 'edit' } },
  {path: 'makeStory', component: CreateUpdateStoryComponent, data: { mode: 'make' } },
  //----------------------------------------

  {path: 'boardStoryLanes', component: BoardStoryLanesComponent },
  //{path: 'boardStoryLanes/:id', component: BoardStoryLanesComponent}, 
  {path: 'burndownChart', component: BurndownChartComponent}, 
>>>>>>> be7c5dfebf2d8d1f6a5ecb3dd1d78c64e6ecaa40
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
