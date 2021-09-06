import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  form: FormGroup;
  form_Submitted = false;
  constructor(private route: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Desc: [''],
    });
  }
  get f() { return this.form.controls }

  ngOnInit(): void {
  }

  onSubmit() {
    this.form_Submitted = true;
    if (this.form.invalid) {
      return;
    }
    var events = JSON.parse(localStorage.getItem("events"));

    if (events == null || events == undefined) {
      events = [];
    }
    let obj = {
      Name: this.form.value.Name,
      Date: this.form.value.Date,
      Desc: this.form.value.Desc,
    }
    events.push(obj);
    localStorage.setItem("events", JSON.stringify(events));
    alert("Congratulations, event added successfully.");
    this.route.navigateByUrl("/event-list");
  }
}
