import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AssignMembersService } from '../_service/assign-members.service';
import { CookieService } from 'angular2-cookie';


@Component({
  selector: 'app-assign-members-menu',
  templateUrl: './assign-members-menu.component.html',
  styleUrls: ['./assign-members-menu.component.css']
})
export class AssignMembersMenuComponent implements OnInit {
  boardID: number;

  constructor(private cookieService: CookieService, private assignMembersService: AssignMembersService, private route: ActivatedRoute) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    )
    var cookie = this.cookieService;
    this.assignMembersService.getAllUsers().then(function (users) {
      cookie.putObject('users', users);
    });
    
    var allUsers = cookie.getObject('users');
    for (var i = 0; i < allUsers.length; i++) {
      this.dropdownList[i] = { "id": allUsers[i].id, "itemName": allUsers[i].firstName + ': ' + allUsers[i].lastName };
    }
    this.selectedItems = [
      { "id": 1, "itemName": "Person1" },
      { "id": 2, "itemName": "Person2" }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Users",
      selectAllText: 'Select All Users',
      unSelectAllText: 'Deselect All Users',
      enableSearchFilter: true,
      searchPlaceHolderText: 'Search for User'
    }
  }
  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

}
