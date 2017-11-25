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
    this.route.params.subscribe(
      (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    )
    
    var cookie = this.cookieService;
    this.user = cookie.getObject('user');
    var loggedIn = this.loginService.isLoggedIn(this.user);
    if(!loggedIn){
      this.router.navigate(['/login']);
    }else{
      var bId = this.boardID;
      this.assignMembersService.getUsersOnBoard(this.boardID).then(function(response){
        if (response != null){
          cookie.putObject('board' + bId + 'Users', response);          
        } else{
          console.log('error! there are no users on this board.');
        }

      });
    }

    this.assignMembersService.getAllUsers().then(function (response) {
      cookie.putObject('users', response);
    });
    
    var allUsers = cookie.getObject('users');
    for (var i = 0; i < allUsers.length; i++) {
      this.dropdownList[i] = { "id": allUsers[i].id, "itemName": allUsers[i].firstName + ' ' + allUsers[i].lastName + ': ' + allUsers[i].username };
    }
    
    var boardUsers = cookie.getObject('board' + this.boardID + 'Users');
    for(var i=0; i < boardUsers.length; i++){
      this.selectedItems[i] = {"id": boardUsers[i].id, "itemName": boardUsers[i].firstName + ' ' + boardUsers[i].lastName + ': ' + boardUsers[i].username};
    }

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
    console.log('user selected: ' + item.itemName);
    console.log('SELECTED USERS:')
    for(var i in this.selectedItems){
      console.log('user['+ i + ']: ' + this.selectedItems[i].itemName);
    }
    var usersList = [];
    //add item to boardUsers cookie
    usersList = this.cookieService.getObject('board' + this.boardID + 'Users');
    usersList.push(item);
    this.cookieService.putObject('board' + this.boardID + 'Users', usersList);

    //verify that cookie has been updated
    console.log('COOKIE');
    console.log(this.cookieService.getObject('board' + this.boardID + 'Users'));
    
  }
  OnItemDeSelect(item: any) {
    console.log('user deselected: ' + item.itemName);
    console.log('SELECTED USERS:')
    for(var i in this.selectedItems){
      console.log('user['+ i + ']: ' + this.selectedItems[i].itemName);
    }

    var usersList = [];
    var newUsersList = [];
    usersList = this.cookieService.getObject('board' + this.boardID + 'Users');
    for(var i in usersList){
      if(usersList[i].id != item.id){
        newUsersList.push(usersList[i]);
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

  updateBoardUsers(boardNum: number){
    console.log('hello');
  }


}
