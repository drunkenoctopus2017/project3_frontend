import { Component, OnInit } from '@angular/core';


import {Task } from '../_model/Task';
import { StoryService } from '../_service/story.service';
import { TaskService } from '../_service/task.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-create-update-tasks',
  templateUrl: './create-update-tasks.component.html',
  styleUrls: ['./create-update-tasks.component.css']
})
export class CreateUpdateTasksComponent implements OnInit {
  roleFromRoute: string;
  tasks: Task[];
  task: Task;
  isCompleted : boolean;
  constructor(
    private router: Router,
    private storyService: StoryService,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) { 
      this.router.events.filter(e => e instanceof NavigationEnd)
      .forEach(e => {
        this.roleFromRoute = route.root.firstChild.snapshot.data['mode'];
      });
    }

  ngOnInit() {

    if(this.roleFromRoute !== 'make')
    {
      this.task = new Task();
      
      console.log(this.storyService.getSelectedStory().id);
      this.task.storyId = this.storyService.getSelectedStory().id;
      
      console.log("From create-update-tasks, storyId: " + this.task.storyId);
      this.taskService.getTaskByStoryId(this.task.storyId).then(response => this.tasks = response  );
    }

    console.log(this.tasks);
  }

  //needed?
  changeStatus(event, task:Task){
    if(event.target.checked){
      task.status = 1;
    } else {
      task.status = 0;
    }
    this.taskService.createUpdateTask(this.task).then(response => {
      this.taskService.getTaskByStoryId(this.task.storyId).then(response => this.tasks = response  );  
      this.router.navigate(['/viewStory']);
   }); 
    console.log(task.status);
  }

  createOrEditTask(){
    this.task.status = 0;
    console.log(this.task);
    this.taskService.createUpdateTask(this.task).then(response => {
      this.taskService.getTaskByStoryId(this.task.storyId).then(response => this.tasks = response  );  
      this.task.description = "";    
      this.router.navigate(['/viewStory']);
   }); 
  }

  deleteTask(task: Task){
    this.taskService.deleteTaskById(task.id).then(response => {
      this.taskService.getTaskByStoryId(this.task.storyId).then(response => this.tasks = response )
      this.router.navigate(['/viewStory']);
    })
  }

}
