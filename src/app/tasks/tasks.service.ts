import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { Task } from './tasks.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  addTask = new Subject<Task[]>();
  tasksChanged = new Subject<Task[]>();
  startedEditing = new Subject<number>();

  private tasks: Task[] = [
    new Task(1,'Fix TaskIt', new Date(), 'High', 'Incomplete'),
    new Task(2,'Finish videos', new Date(), 'High', 'Incomplete'),
  ];

  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  getTaskId(): number {
    return this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) + 1 : 1;
  }

  updateTask(index: number, newTask: Task) {
    this.tasks[index] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }

  createTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }


//   oldDeleteTask(id: number) {
//     const taskIndex = this.tasks.findIndex((task) => task.id === id);
//     if (taskIndex !== -1) {
//       this.tasks.splice(taskIndex, 1);
//       this.tasksChanged.next(this.tasks.slice());
//     }
//   }
// }

  deleteTask(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAPITasks(id);

        Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      }
    });
  }
  deleteAPITasks(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.tasksChanged.next(this.tasks.slice());
  }
}
}
