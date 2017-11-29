import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AssignMembersService } from '../_service/assign-members.service';
import { CookieService } from 'angular2-cookie';
import { LoginService } from '../_service/login.service';
import { SystemUser } from '../_model/SystemUser';
import { PACKAGE_ROOT_URL } from '@angular/core/src/application_tokens';


@Component({
  selector: 'app-assign-members-menu',
  templateUrl: './assign-members-menu.component.html',
  styleUrls: ['./assign-members-menu.component.css']
})
export class AssignMembersMenuComponent implements OnInit {
  boardID: number;
  boardName: string;
  user: SystemUser;
  usersOnBoard: SystemUser[];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  constructor(private loginService: LoginService, private cookieService: CookieService, private assignMembersService: AssignMembersService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach(
       (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    )
    var cookie = this.cookieService;
    this.user = cookie.getObject('user');
    
    var bId = this.boardID;

    //get all board users and store them in a cookie
    this.assignMembersService.getUsersOnBoard(this.boardID).then(function (response) {
      if (response != null) {
        cookie.putObject('board' + bId + 'Users', response);
        console.log(response);
      } else {
        console.log('error! there are no users on this board.');
      }
    });
    
    this.assignMembersService.getUsersOnBoard(this.boardID)
      .then(usersOnBoard => this.selectedItems = this.parseData(usersOnBoard));
    this.assignMembersService.getAllUsers()
      .then(allUsers => this.dropdownList = this.parseData(allUsers));
    
    //store all users in cookie
    this.assignMembersService.getAllUsers().then(function (response) {
      cookie.putObject('users', response);
    });
    //get all users from cookie
    var allUsers = cookie.getObject('users');
    // for (var i = 0; i < allUsers.length; i++) {
    //   //display all users in dropdown list
    //   this.dropdownList[i] = { "id": allUsers[i].id, "itemName": allUsers[i].firstName + ' ' + allUsers[i].lastName + ': ' + allUsers[i].username };
    // }
    // //get board users from cookie
    var boardUsers = cookie.getObject('board' + this.boardID + 'Users');
    // for (var i = 0; i < boardUsers.length; i++) {
    //   //display board users as selected items in the dropdown list
    //   this.selectedItems[i] = { "id": boardUsers[i].id, "itemName": boardUsers[i].firstName + ' ' + boardUsers[i].lastName + ': ' + boardUsers[i].username };
    // }
    

    this.dropdownSettings = {
      singleSelection: false,
      text: "Select Users",
      selectAllText: 'Select All Users',
      unSelectAllText: 'Deselect All Users',
      enableSearchFilter: true,
      searchPlaceHolderText: 'Search for User'
    }
  }
  parseData(users:SystemUser[]) {
    return users.map((user) => ({id: user.id, itemName: user.firstName + " " + user.lastName}));
  }
  onItemSelect(item: any) {
    //Ben, I'm not sure what's going on in here, but line 98 throws an error.
    //I doubt we really need to pay attention to onItemSelect unless we are updating the DB with each click.
    //Personally, I think having a submit button is more robust and I encourage you to follow that design choice.
    
    
    //verify users are selected correctly
    console.log('user selected: ' + item.itemName);
    console.log('SELECTED USERS:')
    for (var user in this.selectedItems) {
      console.log('user[' + user + ']: ' + this.selectedItems[user].itemName);
    }

    var allUsers = this.cookieService.getObject('users');
    var boardUsers = this.cookieService.getObject('board' + this.boardID + 'Users');
    
    //loop through all users
    for(var i=0; i < allUsers.length; i++){
      //if item selected matches user's id, add to list of board users
      if(allUsers[i].id == item.id){
        //switch boolean values to true
        allUsers[i].enabled = true;
        allUsers[i].credentialsNonExpired = true;
        allUsers[i].accountNonExpired = true;
        allUsers[i].accountNonLocked = true;
        boardUsers.push(allUsers[i]);
      }
    }
    //update the board#Users cookie
    this.cookieService.putObject('board' + this.boardID + 'Users', boardUsers);

    //verify that cookie has been updated
    console.log('COOKIE');
    console.log(this.cookieService.getObject('board' + this.boardID + 'Users'));
    
  }
  OnItemDeSelect(item: any) {
    
    //verify that users are being deselected correctly
    console.log('user deselected: ' + item.itemName);
    console.log('SELECTED USERS:')
    for (var i in this.selectedItems) {
      console.log('user[' + i + ']: ' + this.selectedItems[i].itemName);
    }

    var newUsersList = [];
    var boardUsers = this.cookieService.getObject('board' + this.boardID + 'Users');
    //loop through board users
    for (var i in boardUsers) {
      //as long as board user is not the deselected item, add to new list
      if (boardUsers[i].id != item.id) {
        newUsersList.push(boardUsers[i]);
      }
      this.cookieService.putObject('board' + this.boardID + 'Users', newUsersList);
    }
    console.log('COOKIE: ');
    console.log(this.cookieService.getObject('board' + this.boardID + 'Users'));
  }
  onSelectAll(items: any) {
    console.log('ALL SELECTED:');
    console.log(items);
  }
  onDeSelectAll(items: any) {
    console.log('ALL DESELECTED');
    console.log(items);
  }

  updateBoardUsers(boardNum: number) {
    this.assignMembersService.updateBoardUsers(boardNum, this.cookieService.getObject('board' + boardNum + 'Users')).then(function (response) {
      console.log('RESPONSE:');
      console.log(response);
    });
  }
}
