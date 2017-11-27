import { Component, OnInit } from '@angular/core';


import {Task } from '../_model/Task';

@Component({
  selector: 'app-create-update-tasks',
  templateUrl: './create-update-tasks.component.html',
  styleUrls: ['./create-update-tasks.component.css']
})
export class CreateUpdateTasksComponent implements OnInit {
  tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

}
