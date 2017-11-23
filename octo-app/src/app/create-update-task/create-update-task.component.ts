import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../_service/task.service';

@Component({
  selector: 'app-create-update-task',
  templateUrl: './create-update-task.component.html',
  styleUrls: ['./create-update-task.component.css'],
  providers: [TaskService]
})

export class CreateUpdateTaskComponent  {
  taskId: number;
  status: number;

  constructor(private route: ActivatedRoute, private router:Router) {

   }

  ngOnInit(){
    this.route.params.subscribe(
      (params:Params) => {
        this.status = params["status"];
        this.taskId = params["id"];
      }
    )
  }

  updateTask(task:Object){
    //code to perform when updating a task
    console.log("This thing works!")
  }

}
