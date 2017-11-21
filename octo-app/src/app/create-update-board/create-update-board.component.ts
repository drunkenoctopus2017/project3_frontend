import { Component, OnInit } from '@angular/core';
import {BoardService} from '../_service/board.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create-update-board',
  templateUrl: './create-update-board.component.html',
  styleUrls: ['./create-update-board.component.css'],
  providers: [BoardService]
})
export class CreateUpdateBoardComponent implements OnInit {
  boardID: number;
  status: boolean;
  constructor(private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.status = params["status"];
        this.boardID = params["id"]; //grab the board ID
      }
    )
  }

  submit(){
    this.router.navigate(['/createUpdateStory', this.status]);
  }
}
