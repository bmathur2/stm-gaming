import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events = [];
  constructor() { }

  ngOnInit(): void {
    this.events = JSON.parse(localStorage.getItem("events"));
    if (this.events == null || this.events == undefined) {
      this.events = [];
    }
  }

  editEvent(i){

  }
  deleteEvent(i){
    var prmt = confirm("Are you sure want to delete this event?");
    if(prmt){
      this.events.splice(i,1);
      localStorage.setItem('events',JSON.stringify(this.events));
    }
    else{
      return
    }
  }
}
