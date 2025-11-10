import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { Store, StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';

const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  { path: 'login',
    component: LoginComponent,
  },
  {
    path: "", 
    redirectTo: "/login",
    pathMatch: "full"
  },
  {
    path: "tasks",
    component: TasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreModule.forRoot({auth: authReducer})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
