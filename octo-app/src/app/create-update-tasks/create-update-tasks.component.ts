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
      var selectedStoryId = this.storyService.getSelectedStory().id;
      this.taskService.getTaskByStoryId(selectedStoryId).then(response => this.tasks = response  );
    }

    console.log(this.tasks);
  }

  createOrEditTask(){
    if(this.roleFromRoute === 'make')
    {
      var t : Task = {
        id: 0,
        description: this.task.description,
        status: 1
      }
    }


    this.taskService.createUpdateTask(this.task).then(response => this.router.navigate(['/viewStory']))
  }

}
