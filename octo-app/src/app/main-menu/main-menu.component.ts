import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {CookieService} from 'angular2-cookie';

import { SystemUser } from '../_model/SystemUser';
import { ScrumBoard } from '../_model/ScrumBoard';
import { BoardService } from '../_service/board.service';
import { LoginService } from '../_service/login.service';
import { UserService } from '../_service/user.service';
import { BurndownChartService } from '../_service/burndown-chart.service';
import { zuulUrl } from '../_service/zuul-url';
import { Http } from '@angular/http';


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
    private http: Http,
    private router: Router, 
    private route: ActivatedRoute, 
    private loginService: LoginService,
    private userService: UserService, 
    private boardService: BoardService, 
    private cookieService: CookieService,
    private burnDownChartService: BurndownChartService) { }

  ngOnInit() {
    this.user = this.cookieService.getObject('user');
    this.cookieService.remove('currentBoard');
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
    let returnString :string = percentage+"%";
    if(returnString === 'NaN%'){
      returnString = '0%';
    }
    return returnString;
  }

  createScrumBoard() {
    this.router.navigate(['/createBoard']); //creating a board shouldn't need a board ID
  }

  viewBoard(b: ScrumBoard) {
    this.cookieService.putObject('currentBoard', b);
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
    console.log("in the main menu delete method?");
    let r = this.router;
    let bwp = this.boardsWithPercent;
    this.userService.deleteBoard(b.id).then(() => {
      // octo-user-management-service/deleteScrumBoardIdFromUser/{id} remove this board from user's list of board ID's
    let url = zuulUrl+"octo-user-management-service/deleteScrumBoardIdFromUser/"+b.id+"?access_token="+localStorage.getItem('token');;
    let body = this.cookieService.getObject('user');
    this.http.post(url, body).toPromise().then(response => {
      console.log("pulling fresh boards from the oven");
      this.boardService.getBoardsByUserId(this.user.id).then(boards => {
        console.log("boards after delete:");
        console.log(boards);
        this.boards = boards;
        console.log("length of bwp before popping: "+bwp.length);
        let t: number = bwp.length
        for(var i = 0; i < t; i++){
          // empty the array that the html uses to display boards
          console.log("popping this:");
          console.log(bwp.pop());
        }
        // refill with fresh boards
        for(let board of boards){
          this.burnDownChartService.getChartData(board).then(chartObj => {
            console.log(board);
            let stuff: object = {
              board: board, 
              percent: this.percentComplete(chartObj.data[chartObj.data.length-1]["y"],chartObj.maxY)
            }
            console.log("pushing this to boardsWithPercent");
            console.log(board);
            bwp.push(
              {
                board: board, 
                percent: this.percentComplete(chartObj.data[chartObj.data.length-1]["y"],chartObj.maxY)
              }
            )
          })
        }
        console.log("refreshing done");
      });
    })
    }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in main menu component: ', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
