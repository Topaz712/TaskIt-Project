import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    this.tasksService.addTask.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

}
