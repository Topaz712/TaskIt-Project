import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs';

import { TasksService } from '../tasks.service';
import { Task } from '../tasks.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f') taskForm: NgForm;
  @Input() task: Task;
  subscription: Subscription;
  editMode = false;
  editedTaskIndex: number;

  taskForm: FormGroup;

  @Input() isModalVisible = false;

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService) { }

  ngOnInit() {
    this.subscription = this.tasksService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedTaskIndex = index;
          this.editMode = true;
          this.task = this.tasksService.getTask(index);

          if(this.task) {
            this.initForm();
            this.isModalVisible = true;
        }
      }
    );
    if (!this.taskForm) {
      this.initForm();
    }
   }

   private initForm() {
    let taskTitle = '';
    let taskDate = null;
    let taskPriority = '';
    let taskStatus = '';

    if(this.editMode && this.task) {
      taskTitle = this.task.title;
      taskDate = new Date(this.task.date);
      taskPriority = this.task.priority;
      taskStatus = this.task.status;
    }

    this.taskForm = new FormGroup({
      'title': new FormControl(taskTitle, Validators.required),
      'date': new FormControl(taskDate, Validators.required),
      'priority': new FormControl(taskPriority, Validators.required),
      'status': new FormControl(taskStatus, Validators.required),
    });
   }

   onUpdateTask() {
    const value = this.taskForm.value;
    const newTask = new Task(
      this.editMode ? this.task.id : null,
      value.title,
      value.date,
      value.priority,
      value.status
    );

    if (this.editMode) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask)
    } else {
      this.tasksService.createTask(newTask);
    }

    this.editMode = false;
    this.taskForm.reset();
  }

  onCancel() {
    this.isModalVisible = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

