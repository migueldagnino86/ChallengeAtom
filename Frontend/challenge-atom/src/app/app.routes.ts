import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { TaskListComponent } from './tasks/task-list.component';

export const routes: Routes = [
  { path: 'auth', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' }
];