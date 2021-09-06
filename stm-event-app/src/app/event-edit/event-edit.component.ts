import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss']
})
export class EventEditComponent implements OnInit {
  id = null;
  form: FormGroup;
  form_Submitted = false;
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      Name: ['', [Validators.required]],
      Date: ['', [Validators.required]],
      Desc: [''],
    });
  }

  get f() { return this.form.controls }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    var events = JSON.parse(localStorage.getItem("events"));
    if (events == null || events == undefined) {
      alert("No data found.");
      this.router.navigateByUrl("/evnet-list");
    }
    var data = events[this.id];
    if (data == null || data == undefined) {
      alert("No data found.");
      this.router.navigateByUrl("/evnet-list");
    }
    else {
      this.form.patchValue({
        Name: data?.Name,
        Date: data?.Date,
        Desc: data?.Desc,
      })
    }

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
    events[this.id] = obj;
    localStorage.setItem("events", JSON.stringify(events));
    alert("Event updated successfully.");
    this.router.navigateByUrl("/event-list");
  }

}
