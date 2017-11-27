import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-assign-members-menu',
  templateUrl: './assign-members-menu.component.html',
  styleUrls: ['./assign-members-menu.component.css']
})
export class AssignMembersMenuComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(
       (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    );
  }
}
