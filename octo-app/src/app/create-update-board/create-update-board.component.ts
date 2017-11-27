import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BoardService } from '../_service/board.service';

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

  constructor(private route: ActivatedRoute, private boardService: BoardService) { }

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
  }

  //debugging purposes
  seeWhatValueItIs() {
    console.log(this.startDate);
  }

  //this is needed for formatting the date to fill in the input field, 
  //for some reason the input field won't display a raw date object as is
  formatDate(date: Date): string {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

}