import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-task-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.scss']
})
export class TaskEditDialogComponent implements OnInit {
  editForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    completed: new FormControl(false)
  });

  constructor(
    public dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  ngOnInit(): void {
    // Inicializa el formulario con los valores de la tarea
    this.editForm.patchValue({
      title: this.data.task.title,
      description: this.data.task.description,
      completed: this.data.task.completed
    });
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedTask = {
        ...this.data.task,
        ...this.editForm.value
      };
      this.dialogRef.close(updatedTask);
    }
  }
}