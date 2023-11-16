import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[];
  id: number;
  private subscription: Subscription;


  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    console.log(this.tasks);
    this.subscription = this.tasksService.tasksChanged

    // this.tasksService.addTask
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
          console.log('Updated tasks:', this.tasks);
        }
      );

      this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.tasks = [this.tasksService.getTask(this.id)];
          }
        );
  }

  // onEdit() {
  //   this.router.navigate(['tasks',':id/edit'], {
  //     relativeTo: this.route, queryParamsHandling: 'preserve'
  //   });
  // }
  onEditTask() {
    this.router.navigate([':id/edit'], {relativeTo: this.route});
  }

  onDeleteTask() {
    // this.tasksService.deleteTask(this.id);
    this.router.navigate(['/tasks']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
