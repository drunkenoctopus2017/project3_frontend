import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SystemUser } from '../_model/SystemUser';
import { SystemBoard } from '../_model/SystemBoard';

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
  constructor(private router: Router) { }

  ngOnInit() {
    this.boards = [{
      id: 1,
      name: "Uno Board",
      startDate: new Date(),
      duration: 14
    },
    {
      id: 2,
      name: "Board Number 2",
      startDate: new Date(),
      duration: 15
    }];
  }

  percentComplete(b: SystemBoard): string {
    return 40+"%";
  }

  createScrumBoard() {
    console.log("create scrum board method!");
    this.router.navigate(['/createUpdateBoard']);
  }

  viewBoard(b: SystemBoard) {
    console.log(b.name + "'s view scrum board method!");
    this.router.navigate(['/boardStoryLanes']);
  }

  editScrumBoard(b: SystemBoard){
    console.log(b.name + "'s edit scrum board method!");
    this.router.navigate(['/createUpdateBoard']);
  }

  getAllUsers(b: SystemBoard){
    console.log(b.name + "'s get users view method!");
    this.router.navigate(['/assignMembers']);
  }

  triggerModal(b: SystemBoard){
    console.log(b.name + "'s trigger delete board method!");
  }

}
