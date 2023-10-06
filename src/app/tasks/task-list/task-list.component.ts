import { Component, Input } from '@angular/core';
import { Tasks } from '../tasks.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() tasks: Tasks[] = [
    new Tasks('Fix TaskIt', new Date(), 'High', 'Incomplete'),
    new Tasks('Finish videos', new Date(), 'High', 'Incomplete'),
  ];
}
