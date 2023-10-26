import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  {
    path: 'tasks',
    component: TasksComponent,
    children: [
      { path: 'new', component: TaskFormComponent },
      { path: ':id', component: TaskListComponent },
      { path: ':id/edit', component: TaskEditComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
