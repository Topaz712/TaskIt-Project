import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  private subscription: Subscription;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    // this.subscription = this.tasksService.tasksChanged

    this.tasksService.addTask
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
        }
      );
    // this.tasks = {
    //   id: this.route.snapshot.params['id'],
    //   title: this.route.snapshot.params['title'],
    //   date: this.route.snapshot.params['date'],
    //   priority: this.route.snapshot.params['priority'],
    //   status: this.route.snapshot.params['status']
    // }
  }

  // onEdit() {
  //   this.router.navigate(['tasks',':id/edit'], {
  //     relativeTo: this.route, queryParamsHandling: 'preserve'
  //   });
  // }
  onEditTask(index: number) {
    this.tasksService.startedEditing.next(index);
  }

  onRemoveTask(taskId: number) {
    this.tasksService.deleteTask;
    this.router.navigate(['tasks']);
  }

}
