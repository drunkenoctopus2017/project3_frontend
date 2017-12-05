import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ViewChild } from '@angular/core';
import { BoardService } from '../_service/board.service';
import { BurndownChartService } from '../_service/burndown-chart.service';
import { ScrumBoard } from '../_model/ScrumBoard';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  board:ScrumBoard
  // lineChart
  public lineChartData: Array<any>;
  //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions:any;
  public lineChartColors:Array<any> = [
    { // blueish color
      backgroundColor: 'rgba(0, 160, 234,0.2)',
      borderColor: 'rgba(0, 160, 234,1)',
      pointBackgroundColor: 'rgba(0, 160, 234,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 160, 234,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private boardService: BoardService,
    private burndownChartService: BurndownChartService) {   
  }

  ngOnInit() {
    this.board = this.boardService.getSelectedBoard();
    this.burndownChartService.getChartData(this.boardService.getSelectedBoard())
      .then(
        chartData => {
          // console.log("Chart data: ");
          // console.log(chartData);
          this.lineChartData = [{data: chartData.data, cubicInterpolationMode: "monotone", steppedLine: true, spanGaps: false}];
          this.lineChartOptions = {
            responsive: true,
            scales: {
              yAxes: [{
                scaleLabel: {display: true, labelString: 'Burndown Points'},
                ticks: {min: 0, max: chartData.maxY}
              }],
              xAxes: [{
                scaleLabel: {display: true, labelString: 'Project Day #'},
                type: 'linear',
                position: 'bottom',
                ticks: {min: 1, max: this.boardService.getSelectedBoard().duration}
              }]
            }
          };
        }
      );
  }
  
  /**
   * Return a YYYY/MM/DD date string with leading zeros for single digits.
   */
  private formatDateString(date:Date) {
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    return date.getFullYear() + "/" + (mm < 10 ? "0" + mm : mm) + "/" + (dd < 10 ? "0" + dd : dd);
  }

  getStartDateString(): string {
    const d: Date = new Date(this.board.startDate);
    return this.formatDateString(d);
  }

  getEndDateString():string {
    const d: Date = new Date(this.board.startDate);
    d.setDate(d.getDate() + this.board.duration - 1);
    return this.formatDateString(d);
  }
  
  goBack() {
    this.router.navigate(['/boardStoryLanes']);
  }

  // events
  public chartClicked(e:any):void {
    //
  }
  
  public chartHovered(e:any):void {
    //
  }
  
}
