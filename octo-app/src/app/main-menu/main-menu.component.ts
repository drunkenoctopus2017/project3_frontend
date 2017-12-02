import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie';

import { SystemUser } from '../_model/SystemUser';
import { ScrumBoard } from '../_model/ScrumBoard';
import { BoardService } from '../_service/board.service';
import { LoginService } from '../_service/login.service';
import { UserService } from '../_service/user.service';
import { BurndownChartService } from '../_service/burndown-chart.service';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  // user: SystemUser = {
  //   id: 1,
  //   username: "im",
  //   password: "dabes",
  //   firstName: "Cool",
  //   lastName: "Guy",
  //   role: 200, 
  //   enabled: true, 
  //   accountNonExpired: true,
  //   accountNonLocked: true,
  //   credentialsNonExpired: true
  // };
  user: SystemUser;
  boards: ScrumBoard[];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private loginService: LoginService,
    private userService: UserService, 
    private boardService: BoardService, 
    private cookieService: CookieService,
    private burnDownChartService: BurndownChartService) { }

  ngOnInit() {
    //moved to AuthGuard
    /*
    var currentUser = this.cookieService.getObject('user');
    var loggedIn = this.loginService.isLoggedIn(currentUser);


    if (loggedIn) {
      this.user = currentUser;
      console.log("pulling fresh boards from the oven");
      this.boardService.getBoardsByUserId(this.user.id).then(boards => this.boards = boards);
    } else {
      this.router.navigate(['/login']);
    }
    */
    this.user = this.cookieService.getObject('user');
    this.boardService.getBoardsByUserId(this.user.id).then(boards => this.boards = boards);
  }

  percentComplete(b: ScrumBoard): string {
    let percentage: number = this.burnDownChartService.getPercentageCompletion(b);
    return percentage+"%";
  }

  createScrumBoard() {
    console.log("create scrum board method!");
    this.router.navigate(['/createBoard']); //creating a board shouldn't need a board ID
  }

  viewBoard(b: ScrumBoard) {
    
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/boardStoryLanes']);
  }

  editScrumBoard(b: ScrumBoard){
    console.log(b.name + "'s edit scrum board method! board ID is: "+b.id);
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/updateBoard']); //true means creating, false means editing
  }

  getAllUsers(b: ScrumBoard){
    console.log(b.name + "'s get users view method! board ID is: "+b.id);
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/assignMembers']);
  }

  deleteScrumBoard(b: ScrumBoard){
    let r = this.router;
    console.log(b.name + "'s trigger delete board method!");
    this.userService.deleteBoard(b.id).then(() => {
      console.log("pulling fresh boards from the oven");
      this.boardService.getBoardsByUserId(this.user.id).then(boards => this.boards = boards);
    }).catch(this.handleError)
    
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in main menu component: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
