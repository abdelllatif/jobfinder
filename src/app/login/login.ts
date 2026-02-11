import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth';
import { User } from '../core/models/User';

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

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email.trim(), password.trim()).subscribe({
      next: (user: User | null) => {
        this.loading = false;

        if (user) {
          // Save user in localStorage without password
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid email or password';
        }
      },
      error: () => {
        this.loading = false;
        this.error = 'Server error. Try again later.';
      }
    });
  }
}
