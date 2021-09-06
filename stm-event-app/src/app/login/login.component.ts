import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  loginForm_Submitted = false;
  returnUrl: string = '';

  constructor(private route: Router, private fb: FormBuilder, private router :ActivatedRoute) {
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    // redirect to home if already logged in
    const local = localStorage.getItem('logged_in');
    var user = false;
    if (local == undefined || local == 'false' || local == null) {
      user = false;
    }
    else {
      user = true;
    }
    if (user) {
      this.route.navigate(['/event-list']);
    }
    else {
      localStorage.setItem("logged_in", JSON.stringify(false));
      localStorage.setItem("logged_user", "{}");
    }
    this.returnUrl = this.router.snapshot.queryParams['returnUrl'] || '/';
  }


  get f() { return this.loginForm.controls }

  doLogin() {
    this.loginForm_Submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    var is_exist = false;
    var users= JSON.parse(localStorage.getItem("users"));
    if (users == null || users == undefined) {
      alert("User name or password is incorrect.");
      return;
    }
    var logged_user = {};
    for (var user of users) {
      if (this.loginForm.value.UserName == user.UserName) {
        logged_user = user;
        is_exist = true;
        break;
      }
    }
    if (is_exist) {
      localStorage.setItem("logged_in", 'true');
      localStorage.setItem("logged_user", JSON.stringify(logged_user));
      this.route.navigate([this.returnUrl]);
    }
    else {
      alert("User name or password is incorrect.");
    }
    
  }
}


