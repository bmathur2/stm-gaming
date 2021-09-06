import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventEditComponent } from './event-edit/event-edit.component';
import { EventListComponent } from './event-list/event-list.component';
import { AuthGuard } from './_guard/auth.guard';

const routes: Routes = [

  {
    path: "",
    pathMatch:"full",
    redirectTo: 'event-list'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: 'event-create',
    component: EventCreateComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'event-edit/:id',
    component: EventEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'event-list',
    component: EventListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    redirectTo: 'event-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
