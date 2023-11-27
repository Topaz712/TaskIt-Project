import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { TasksRoutingModule } from './tasks/tasks-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full'},
  { path: 'auth', component: AuthComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'kanban-board', loadChildren: () => import('./kanban-board/kanban-board.module').then(m => m.KanbanBoardModule) },
  // { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes), TasksRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule { }
