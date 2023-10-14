import { Injectable } from '@angular/core';

import { Task } from './tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks: Task[] = [
    new Task('Fix TaskIt', new Date(), 'High', 'Incomplete'),
    new Task('Finish videos', new Date(), 'High', 'Incomplete'),
  ];

  constructor() { }

  getTasks() {
    return this.tasks.slice();
  }
}
