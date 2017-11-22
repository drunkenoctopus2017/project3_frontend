import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, Params } from '@angular/router';

@Component({
  selector: 'app-create-update-story',
  templateUrl: './create-update-story.component.html',
  styleUrls: ['./create-update-story.component.css']
})
export class CreateUpdateStoryComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute, private router: Router) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.boardID = params["id"]; //grab the board ID
      }
    )
  }
  submit(){
    this.router.navigate(['/createUpdateTask']);
  }
}
