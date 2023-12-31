import { Component, EventEmitter, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  toggleModal: EventEmitter<void> = new EventEmitter<void>();

  showModal: boolean = false;

  constructor() { }

  ngOnInit() {}
}
