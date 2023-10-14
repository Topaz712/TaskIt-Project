import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  @Output() toggleModal: EventEmitter<void> = new EventEmitter<void>();

  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
    this.toggleModal.emit();
  }

  closeModal() {
    this.isModalVisible = false;
    this.toggleModal.emit();
  }
}
