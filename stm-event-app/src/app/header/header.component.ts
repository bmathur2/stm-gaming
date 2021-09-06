import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  getStatus(){
    const local = localStorage.getItem('logged_in');
    if (local == undefined || local == 'false' || local == null) {
      return false;
    }
    else {
      return true;
    }
  }


  logOut() {
    localStorage.removeItem('logged_in');
    localStorage.removeItem('logged_user');
    this.route.navigate(['/login'])
  }
}
