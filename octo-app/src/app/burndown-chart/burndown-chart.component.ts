import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ViewChild } from '@angular/core';
import { BoardService } from '../_service/board.service';
import { BurndownChartService } from '../_service/burndown-chart.service';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute, 
              private boardService: BoardService,
              private burndownChartService: BurndownChartService) { }

  ngOnInit() {
    this.boardID = this.boardService.getSelectedBoard().id;
    this.burndownChartService.getChartData(this.boardService.getSelectedBoard())
      .then(chartData => this.lineChartData = [
        {data: chartData.data, cubicInterpolationMode: "monotone", steppedLine: true, spanGaps: false}
      ])
  }



    // lineChart
    public lineChartData: Array<any>;
    //public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
      responsive: true,
      scales: {
        yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Burndown Points'
            },
            ticks: {
                min: 0,
            }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Project Day #'//'Days Since Start'
          },
          // type: 'time',
          // time: {
          //   unit: 'day'
          // }
          type: 'linear',
          position: 'bottom',
          ticks: {
            min: 1,
            max: this.boardService.getSelectedBoard().duration
          }
        }]
      }
    };
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

    public randomize():void {
      let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
        }
      }
      this.lineChartData = _lineChartData;
    }
   
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
   
    public chartHovered(e:any):void {
      console.log(e);
    }
  
}
