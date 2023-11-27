import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { KanbanBoardComponent } from './kanban-board.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from '../sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: KanbanBoardComponent },
];

@NgModule({
  declarations: [KanbanBoardComponent, SidebarComponent],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class KanbanBoardModule { }
