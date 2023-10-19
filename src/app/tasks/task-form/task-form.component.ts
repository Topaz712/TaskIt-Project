import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() toggleModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() isModalVisible = false;
  
  title = '';
  date = '';
  priority = '';
  status = '';

  constructor(
    private tasksService: TasksService) { }

  ngOnInit(): void {

  }

  onCreate() {
    // this.tasksService.createTask
    console.log(this.title);
    console.log(this.date);
  }

  closeModal() {
    this.toggleModal.emit();
  }
}
