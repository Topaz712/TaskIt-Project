import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { TasksComponent } from "./tasks.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";
import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TasksRoutingModule } from "./tasks-routing.module";
import { TaskFormComponent } from "./task-form/task-form.component";

@NgModule({
  declarations: [
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskEditComponent,
    TaskFormComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TasksRoutingModule
  ],
  exports: [
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskEditComponent,
    TaskFormComponent
  ]
})
export class TasksModule {

}
