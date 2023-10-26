import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private router: Router) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    this.tasksService.addTask.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }
  onRemoveTask(taskId: number) {
    this.tasksService.delete
    this.router.navigate(['tasks']);
  }

}
