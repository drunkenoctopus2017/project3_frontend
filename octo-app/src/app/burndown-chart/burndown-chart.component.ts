import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ViewChild } from '@angular/core';
import { BoardService } from '../_service/board.service';

@Component({
  selector: 'app-burndown-chart',
  templateUrl: './burndown-chart.component.html',
  styleUrls: ['./burndown-chart.component.css']
})
export class BurndownChartComponent implements OnInit {
  boardID: number;

  constructor(private route: ActivatedRoute, private boardService: BoardService) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.boardID = params["id"];
      }
    )
  }



    // lineChart
    public lineChartData:Array<any> = [
      {
        //data: [110, 97, 80, 80, 56, 55, 40], 
        data:[{x:0,y:66},
        {x:1,y:56},
        //{x:2,y:56},
        {x:3,y:51},
        {x:4,y:40},
        //{x:5,y:40},
        {x:6,y:35},
        
        //{x:7,y:35},
        //{x:8,y:35},
        {x:9,y:25},
        //{x:10,y:25},
        {x:11,y:10},
        //{x:12,y:10},
        {x:13,y:5},
        // {x:14,y:5},
        {x:18,y:30}],
        cubicInterpolationMode: "monotone",
        steppedLine: true,
        spanGaps: false
      }
    ];
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
            labelString: 'Days Since Start'
          },
          // type: 'time',
          // time: {
          //   unit: 'day'
          // }
          type: 'linear',
          position: 'bottom',
          ticks: {
            max: this.boardService.selectedBoard.duration
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
