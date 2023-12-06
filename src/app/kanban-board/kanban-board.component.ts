import { Component, OnInit } from '@angular/core';
import { Task } from '../tasks/tasks.model';
import { TasksService } from '../tasks/tasks.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css']
})
export class KanbanBoardComponent implements OnInit {
  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
    console.log('Kanban works!');
    this.tasks.forEach(task => {
      if (task.status === 'To Do') {
        this.toDoTasks.push(task);
      } else if (task.status === 'In Progress') {
        this.inProgressTasks.push(task);
      } else if (task.status === 'Completed') {
        this.completedTasks.push(task);
      }
    });
  }

  onTaskStatusChange(index: number, newStatus: string) {
    this.tasks[index].status = newStatus;
    this.tasksService.updateTask(index, this.tasks[index]);
  }

  nextStatus(currentStatus: string): string {

    return 'Hello';
  }
}
