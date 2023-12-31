import { Component, Input } from '@angular/core';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() user: User[];
}
