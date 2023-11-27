import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.model';
import { KanbanBoardComponent } from 'src/app/kanban-board/kanban-board.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() toggleModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() isModalVisible = false;

  title = '';
  date: Date = new Date();
  priority = '';
  status = '';

  constructor(
    private tasksService: TasksService,
    private kanbanBoard: KanbanBoardComponent) { }

  ngOnInit(): void {

  }

  onCreate() {
    console.log('onCreate called');
    console.log('Title:', this.title);
    console.log('Date:', this.date);
    console.log('Priority:', this.priority);
    console.log('Status:', this.status);

    const task: Task = {
      id: this.tasksService.getTaskId(),
      title: this.title,
      date: new Date(this.date),
      priority: this.priority,
      status: this.kanbanBoard.nextStatus('To Do'),
    };

      this.tasksService.createTask(task);
      
      // this.toggleModal.emit();
      // this.resetForm();
  }

  closeModal() {
    this.toggleModal.emit();
  }

  // private resetForm() {
  //   this.title = '';
  //   this.date = null;
  //   this.priority = '';
  //   this.status = '';
  // }
}
