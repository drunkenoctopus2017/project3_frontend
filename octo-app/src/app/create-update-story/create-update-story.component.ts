import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-create-update-story',
  templateUrl: './create-update-story.component.html',
  styleUrls: ['./create-update-story.component.css']
})
export class CreateUpdateStoryComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    )
  }

}
