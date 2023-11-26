import { Component } from '@angular/core';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User[] = [
    new User('https://images.pexels.com/photos/15272229/pexels-photo-15272229/free-photo-of-black-and-white-photo-of-mountains-and-highway.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load', 'Topaz@taskit.com')
    ];

}
