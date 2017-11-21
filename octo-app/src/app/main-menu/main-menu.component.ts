import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SystemUser } from '../_model/SystemUser';
import { SystemBoard } from '../_model/SystemBoard';
import { BoardService } from '../_service/board.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  user: SystemUser = {
    id: 1,
    username: "im",
    password: "dabes",
    firstName: "Cool",
    lastName: "Guy",
    role: 200
  };
  boards: SystemBoard[];
  constructor(private router: Router, private boardService: BoardService) { }

  ngOnInit() {
    this.boards = this.boardService.getBoardsByUserID(1);
  }

  percentComplete(b: SystemBoard): string {
    //insert percentage calculation logic call here
    return 40+"%";
  }

  createScrumBoard() {
    console.log("create scrum board method!");
    this.router.navigate(['/createUpdateBoard', true, 0]); //creating a board shouldn't need a board ID
  }

  viewBoard(b: SystemBoard) {
    console.log(b.name + "'s view scrum board method! board ID is: "+b.id);
    this.router.navigate(['/boardStoryLanes', b.id]);
  }

  editScrumBoard(b: SystemBoard){
    console.log(b.name + "'s edit scrum board method! board ID is: "+b.id);
    this.router.navigate(['/createUpdateBoard', false, b.id]); //true means creating, false means editing
  }

  getAllUsers(b: SystemBoard){
    console.log(b.name + "'s get users view method! board ID is: "+b.id);
    this.router.navigate(['/assignMembers', b.id]);
  }

  triggerModal(b: SystemBoard){
    console.log(b.name + "'s trigger delete board method!");
  }

}
