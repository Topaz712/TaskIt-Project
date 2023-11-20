import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() toggleModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() isModalVisible = false;

  title = '';
  date = Date;
  priority = '';
  status = '';

  constructor(
    private tasksService: TasksService) { }

  ngOnInit(): void {

  }

  onCreate() {
    const task: Task = {
      title: this.title,
      date: new Date,
      priority: this.priority,
      status: this.status};

      this.tasksService.createTask(task);
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
