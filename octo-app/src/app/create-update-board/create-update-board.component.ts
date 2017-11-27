import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import {CookieService} from 'angular2-cookie';

import { BoardService } from '../_service/board.service';
import { ScrumBoard } from '../_model/ScrumBoard';
import { AssignMembersService } from '../_service/assign-members.service';
import { SystemUser } from '../_model/SystemUser';

@Component({
  selector: 'app-create-update-board',
  templateUrl: './create-update-board.component.html',
  styleUrls: ['./create-update-board.component.css']
})
export class CreateUpdateBoardComponent implements OnInit {
  boardID: number;
  status: string;
  startDate: string = this.formatDate(new Date());
  //startDate: Date = new Date();
  sbName: string;
  duration: number;

  constructor(private router: Router, private route: ActivatedRoute, 
              private boardService: BoardService, 
              private assignMembersService: AssignMembersService,
              private cookies: CookieService) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.status = params["status"];
        this.boardID = params["id"]; //grab the board ID
      }
    )
    console.log("this is status => "+this.status);
    if(this.status == "false"){ //if it's in edit mode 
      console.log("editing");
      let currBoard = this.boardService.getSelectedBoard();
      this.sbName = currBoard.name;
      this.startDate = this.formatDate(new Date(currBoard.startDate));
      //this.startDate = new Date(currBoard.startDate);
      console.log(this.startDate);
      this.duration = currBoard.duration;
    }
    console.log("done checking status");
  }

  submit() {
    //call board service create board method
    var sb: ScrumBoard = {
      id: 0,
      name: this.sbName,
      startDate: new Date(this.parseDate(this.startDate)),
      duration: this.duration
    }
    if(this.status == "false"){
      sb.id = this.boardService.getSelectedBoard().id;
      console.log("editing, edit board's id is this: "+sb.id);
    }
    var r = this.router;
    var b = this.boardService;
    var a = this.assignMembersService;
    var c = this.cookies;
    b.createUpdateBoard(sb).then(board => {
      b.setSelectedBoard(board);
      console.log("this is now the selected board: "+b.getSelectedBoard());
      var u: SystemUser[] = [c.getObject('user')];
      a.updateBoardUsers(board.id, u);
      r.navigate(['/boardStoryLanes']);
    })
  }

  //debugging purposes
  seeWhatValueItIs() {
    console.log(this.startDate);
    console.log("can it be turned into a date object? "+new Date(this.parseDate(this.startDate)));
  }

  //this is needed for formatting the date to fill in the input field, 
  //for some reason the input field won't display a raw date object as is
  formatDate(date: Date): string {
    var d = new Date(date),
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// parse a date in yyyy-mm-dd format
parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

}