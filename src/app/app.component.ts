import { Component } from '@angular/core';
import { User } from './auth/user.model';
import { KanbanBoardModule } from './kanban-board/kanban-board.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User[] = [
    new User('Topaz@taskit.com', '12345', 'abcde', new Date())
    ];

}
