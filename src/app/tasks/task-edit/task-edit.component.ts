import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') taskForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedTaskIndex: number;
  editedTask: Task;
  task: Task[] = [];

  constructor(
    private tasksService: TasksService) { }

  ngOnInit() {
    this.subscription = this.tasksService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedTaskIndex = index;
          this.editMode = true;
          this.editedTask = this.tasksService.getTask(index);
          this.taskForm.setValue({
            title: this.editedTask.title,
            date: this.editedTask.date,
            priority: this.editedTask.priority,
            status: this.editedTask.status
          })
        }
      );
   }

   onUpdateTask(form: NgForm) {
    const value = form.value;
    const newTask = new Task(value.title, value.date, value.priority, value.status);
    if (this.editMode) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask)
    } else {
      this.tasksService.addTasks(newTask);
    }
    this.editMode = false;
    form.reset();
  }

  // closeModal() {
  //   this.toggleModal.emit();
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

