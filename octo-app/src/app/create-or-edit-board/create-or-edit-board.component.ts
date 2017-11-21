import { Component, OnInit } from '@angular/core';

import {BoardService} from '../_service/board.service'

@Component({
  selector: 'app-create-or-edit-board',
  templateUrl: './create-or-edit-board.component.html',
  styleUrls: ['./create-or-edit-board.component.css'],
  providers: [BoardService]
})
export class CreateOrEditBoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}