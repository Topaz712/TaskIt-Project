import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @Input() task: Task;
  subscription: Subscription;
  editMode = false;
  editedTaskIndex: number;

  constructor(
    private tasksService: TasksService) { }

  ngOnInit() {
    this.subscription = this.tasksService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedTaskIndex = index;
          this.editMode = true;
          this.task = this.tasksService.getTask(index);
          this.taskForm.form.patchValue({
            title: this.task.title,
            date: this.task.date,
            priority: this.task.priority,
            status: this.task.status
          });
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

  onCancel() {
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

