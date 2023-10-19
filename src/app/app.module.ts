import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TaskEditComponent } from './tasks/task-edit/task-edit.component';
import { TasksService } from './tasks/tasks.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskFormComponent,
    DropdownDirective,
    TaskEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
