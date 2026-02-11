import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginForm: FormGroup;
  error: string = '';
  loading: boolean = false; // 🔹 loading state

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]
    });

  }

   onLogin() {
    this.error = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error = 'Please fix validation errors';
      return;
    }

    this.loading = true; // 🔹 start loading

    const { email, password } = this.loginForm.value;

    this.authService.login(email.trim(), password.trim()).subscribe({
      next: (users) => {
        this.loading = false; // 🔹 stop loading

        if (users.length > 0) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid email or password';
        }
      },
      error: () => {
        this.loading = false; // 🔹 stop loading
        this.error = 'Server error. Try again later.';
      }
    });
  }
}
