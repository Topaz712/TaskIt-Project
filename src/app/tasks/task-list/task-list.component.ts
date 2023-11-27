import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task } from '../tasks.model';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { KanbanBoardComponent } from 'src/app/kanban-board/kanban-board.component';


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

  showModal: boolean = true;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private kanbanBoard: KanbanBoardComponent) { }

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
              // this.showModal = true;
            } else {
              // this.showModal = false;
            }
          }
          );
        }

  onShowModal(task: Task) {
    console.log('onShowModal - showModal:', this.showModal, 'taskSelected:', this.taskSelected);
    this.showModal = true;
    this.taskSelected = task;
    console.log('onShowModal - showModal:', this.showModal, 'taskSelected:', this.taskSelected);
  }

  onEditTask(index: number) {
    this.tasksService.startedEditing.next(index);
    const taskIndex = index + 1;
    this.router.navigate(['/tasks', taskIndex, 'edit']);
    // this.showModal = true;
  }

  onTaskStatusChange(index: number) {
    const currentTask = this.tasks[index];
    const nextStatus = this.kanbanBoard.nextStatus(currentTask.status);

    this.tasksService.updateTask(index, {
      ...currentTask, status: nextStatus
    });
  }

  // onDeleteTask(id: number) {
  //   console.log("Deleting task with id:", id);
  //   const taskToDelete = this.tasks.find(task => task.id === id);

  //   if (taskToDelete) {
  //       this.onShowModal(taskToDelete);
  //     }

  //   // this.tasksService.deleteTask(id);

  // }

  // onConfirmDelete(id: number) {
  //   if (this.taskSelected) {
  //     this.tasksService.deleteTask(this.taskSelected.id);
  //     this.showModal = false;
  //     this.taskSelected = null;
  //   }
  // }

  onDeleteTask(id: number) {
    this.tasksService.deleteTask(id);
  }

  onCancelModal() {
    this.taskSelected = null;
    this.showModal = false;
    console.log('onCancelModal - showModal:', this.showModal, 'taskSelected:', this.taskSelected);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
