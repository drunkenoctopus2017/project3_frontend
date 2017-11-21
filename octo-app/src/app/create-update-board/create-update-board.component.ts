import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BoardService} from '../_service/board.service';

@Component({
  selector: 'app-create-update-board',
  templateUrl: './create-update-board.component.html',
  styleUrls: ['./create-update-board.component.css'],
  providers: [BoardService]
})
export class CreateUpdateBoardComponent implements OnInit {

  constructor(private boardService: BoardService, private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.router.navigate(['/mainMenu']);
  }
}
