import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../_model/SystemUser';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  user: SystemUser;
  constructor() { }

  ngOnInit() {
  }

}
