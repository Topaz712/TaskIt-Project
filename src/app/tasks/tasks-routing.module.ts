import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TaskEditComponent } from "./task-edit/task-edit.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { TasksComponent } from "./tasks.component";
import { TaskDetailComponent } from "./task-detail/task-detail.component";

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      // { path: '', redirectTo: 'new', pathMatch: 'full' },
      { path: 'create', component: TaskFormComponent },
      { path: 'kanban', component: TaskDetailComponent},
      { path: ':id', component: TaskListComponent },
      { path: ':taskIndex/edit', component: TaskEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {

}
