import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-board-story-lanes',
  templateUrl: './board-story-lanes.component.html',
  styleUrls: ['./board-story-lanes.component.css']
})
export class BoardStoryLanesComponent implements OnInit {
  boardID: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.boardID = params["id"];
      }
    )
  }

}
