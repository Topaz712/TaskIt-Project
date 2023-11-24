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
  taskSelected: Task;
  private subscription: Subscription;

  showModal: boolean = false;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    console.log(this.tasks);
    this.subscription = this.tasksService.tasksChanged
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
          console.log('Updated tasks:', this.tasks);
        }
      );

      this.route.params
        .subscribe(
          (params: Params) => {
            const id = +params['id'];

            if(!isNaN(id)) {
              this.id = id;
              this.showModal = true;
            } else {
            this.showModal = true;
            }
          }
        );
  }

  // onEdit() {
  //   this.router.navigate(['tasks',':id/edit'], {
  //     relativeTo: this.route, queryParamsHandling: 'preserve'
  //   });
  // }
  onEditTask(index: number) {
    this.tasksService.startedEditing.next(index);
    this.showModal = true;
    // this.router.navigate([':id/edit'], {relativeTo: this.route});
  }

  // onDeleteTask(id: number) {
  //   // this.tasksService.deleteTask(this.id);
  //   // this.router.navigate(['/tasks']);
  //   console.log("Deleting task with id:", id);
  //   this.tasksService.deleteTask(id);
  //   console.log("task deleted successfully");
  //   console.log("updated tasks:", this.tasksService.getTasks());
  // }

  onDeleteTask(id: number) {
    console.log("Deleting task with id:", id);
    console.log("Before deletion - showModal:", this.showModal, "taskSelected:", this.taskSelected);

    this.tasksService.deleteTask(id);

    console.log("After deletion - showModal:", this.showModal, "taskSelected:", this.taskSelected);
    console.log("Updated tasks:", this.tasksService.getTasks());
  }

  onShowModal(task: Task) {
    this.taskSelected = task;
    this.showModal = true;
  }

  onConfirmDelete(id: number) {
    if (this.taskSelected) {
      this.tasksService.deleteTask(this.taskSelected.id);
      this.showModal = false;
      this.taskSelected = null;
    }
  }

  onCancelModal() {
    this.taskSelected = null;
    this.showModal = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
