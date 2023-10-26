import { Injectable, EventEmitter } from '@angular/core';

import { Task } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  addTask = new EventEmitter<Task[]>();

  private tasks: Task[] = [
    new Task('Fix TaskIt', new Date(), 'High', 'Incomplete'),
    new Task('Finish videos', new Date(), 'High', 'Incomplete'),
  ];

  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }

  createTask(task: Task) {
    this.tasks.push(task);
    this.addTask.emit(this.tasks.slice());
  }

  deleteTask(task: Task) {
    this.tasks.splice();
  }
}
