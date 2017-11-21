import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-update-board',
  templateUrl: './create-update-board.component.html',
  styleUrls: ['./create-update-board.component.css']
})
export class CreateUpdateBoardComponent implements OnInit {
  boardID: number;
  status: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.status = params["status"];
        this.boardID = params["id"]; //grab the board ID
      }
    )
  }

}
