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
    new Task('Fix TaskIt', new Date(), 'High', 'Incomplete'),
    new Task('Finish videos', new Date(), 'High', 'Incomplete'),
  ];

  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }

  getTask(index: number) {
    return this.tasks[index];
  }

  addTasks(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }

  updateTask(index: number, newTask: Task) {
    this.tasks[index] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }

  createTask(task: Task) {
    this.tasks.push(task);
    this.addTask.next(this.tasks.slice());
  }

  deleteTask(task: Task) {
    this.tasks.splice(0, 1);
  }
}
