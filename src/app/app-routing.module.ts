import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TasksRoutingModule } from './tasks/tasks-routing.module';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: '', redirectTo: '/header', pathMatch: 'full' },
  { path: 'header', component: HeaderComponent },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes), TasksRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
