import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    this.tasksService.addTask.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  onEdit() {
    this.router.navigate(['tasks',':id/edit'], {
      relativeTo: this.route, queryParamsHandling: 'preserve'
    });
  }

  onRemoveTask(taskId: number) {
    this.tasksService.deleteTask;
    this.router.navigate(['tasks']);
  }

}
