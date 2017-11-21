import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.boardID = params["id"];
      }
    )
  }

}
