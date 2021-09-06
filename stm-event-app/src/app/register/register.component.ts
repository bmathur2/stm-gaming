import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  registerForm_Submitted = false;
  constructor(private route: Router, private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      FirstName: ['', [Validators.required]],
      LastName: [''],
      Email: ['', [Validators.required, Validators.email]],
      Phone: [''],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  get f() { return this.registerForm.controls }

  doRegister() {
    this.registerForm_Submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    var is_exist = false;
    var users= JSON.parse(localStorage.getItem("users"));
    
    if (users == null || users == undefined) {
      users = [];
    }
    for (let user of users) {
      if (this.registerForm.value.UserName == user.UserName) {
        is_exist = true;
        break;
      }
    }
    if (!is_exist) {
      let obj = {
        Email: this.registerForm.value.Email,
        Password: this.registerForm.value.Password,
        FirstName: this.registerForm.value.FirstName,
        LastName: this.registerForm.value.LastName,
        Phone: this.registerForm.value.Phone,
        UserName: this.registerForm.value.UserName,
      }
      users.push(obj);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Congratulations, you have successfully registered with us.");
      this.route.navigateByUrl("/login");
    }
    else {
      alert("User name is already taken.");
    }
  }
}
