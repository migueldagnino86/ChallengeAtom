import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksService } from './tasks.service';
import { Task } from '../models/task.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from './task-edit-dialog.component';
import { Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private tasksService: TasksService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  toggleComplete(task: Task): void {
    this.tasksService.updateTask(task.id, { completed: !task.completed })
      .subscribe(() => this.loadTasks());
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, { data: { task } });
    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask) this.loadTasks();
    });
  }

  deleteTask(id: string): void {
    this.tasksService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  logout(): void {
    this.router.navigate(['/auth']);
  }
}