import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  id: number;
  editMode = false;
  editedTaskIndex: number;

  taskForm: FormGroup;

  @Output() toggleModal: Subject<void> = new Subject<void>();

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
          this.taskForm.patchValue({
            taskId: this.task.id,
            title: this.task.title,
            date: this.task.date,
            priority: this.task.priority,
            status: this.task.status
          });
        }
      }
    );
   }

   private initForm() {
    let taskId = '';
    let taskTitle = '';
    let taskDate = null;
    let taskPriority = '';
    let taskStatus = '';

    if(this.editMode) {
      const task = this.tasksService.getTask(this.id);
      taskTitle = this.task.title;
      taskDate = this.task.date;
      taskPriority = this.task.priority;
      taskStatus = this.task.status;
    }

    this.taskForm = new FormGroup({
      'title': new FormControl(taskTitle),
      'date': new FormControl(taskDate),
      'priority': new FormControl(taskPriority),
      'status': new FormControl(taskStatus),
    });
   }

   onUpdateTask() {
    const value = this.taskForm.value;
    const newTask = new Task(value.id, value.title, value.date, value.priority, value.status);

    if (this.editMode) {
      this.tasksService.updateTask(this.editedTaskIndex, newTask)
    } else {
      this.tasksService.addTasks(newTask);
    }

    this.editMode = false;
    this.taskForm.reset();
  }

  onCancel() {
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

