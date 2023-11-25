import { Injectable } from '@angular/core';

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

  // deleteTask(task: Task) {
  //   this.tasks.splice(0, 1);
  // }

  deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.tasksChanged.next(this.tasks.slice());
    }
  }
}
