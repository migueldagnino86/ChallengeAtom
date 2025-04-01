import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      this.authService.checkUser(email).subscribe({
        next: (res) => res.exists ? this.router.navigate(['/tasks']) : this.openConfirmationDialog(email),
        error: (err) => console.error('Error:', err)
      });
    }
  }

  private openConfirmationDialog(email: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: `¿Crear usuario con ${email}?` }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.authService.createUser(email).subscribe({
          next: () => this.router.navigate(['/tasks']),
          error: (err) => console.error('Error:', err)
        });
      }
    });
  }
}