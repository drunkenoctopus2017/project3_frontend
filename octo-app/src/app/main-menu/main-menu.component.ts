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
  boardsWithPercent: Array<any> = [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private loginService: LoginService,
    private userService: UserService, 
    private boardService: BoardService, 
    private cookieService: CookieService,
    private burnDownChartService: BurndownChartService) { }

  ngOnInit() {
    this.user = this.cookieService.getObject('user');
    this.boardService.getBoardsByUserId(this.user.id).then(boards => {
      this.boards = boards;
      let bwp = this.boardsWithPercent;
      for(let board of boards){
        this.burnDownChartService.getChartData(board).then(chartObj => {
          console.log(board);
          let stuff: object = {
            board: board, 
            percent: this.percentComplete(chartObj.data[chartObj.data.length-1]["y"],chartObj.maxY)
          }
          bwp.push(
            {
              board: board, 
              percent: this.percentComplete(chartObj.data[chartObj.data.length-1]["y"],chartObj.maxY)
            }
          )
        })
      }

    });
   
    //this.burnDownChartService.getChartData()
  }

  percentComplete(lastY: number, maxY: number): string {
    let percentage: number = Math.floor((maxY - lastY) / maxY * 100);
    //let percentage: number = this.burnDownChartService.getPercentageCompletion(b);
    return percentage+"%";
  }

  createScrumBoard() {
    this.router.navigate(['/createBoard']); //creating a board shouldn't need a board ID
  }

  viewBoard(b: ScrumBoard) {
    
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/boardStoryLanes']);
  }

  editScrumBoard(b: ScrumBoard){
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/updateBoard']); //true means creating, false means editing
  }

  getAllUsers(b: ScrumBoard){
    this.boardService.setSelectedBoard(b);
    this.router.navigate(['/assignMembers']);
  }

  deleteScrumBoard(b: ScrumBoard){
    let r = this.router;
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
