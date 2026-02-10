import { Component } from '@angular/core';
import { AuthService }  from '../../auth/auth';
import { User } from  '../../core/models/User';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(form: NgForm) {
    if (!form.valid) {
      this.error = 'Please fill all fields correctly';
      return;
    }

    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    };

    this.authService.checkEmailExists(newUser.email).subscribe(users => {
      if (users.length > 0) {
        this.error = 'Email already exists';
      } else {
        this.authService.register(newUser).subscribe(() => {
          alert('Registration successful!');
          this.router.navigate(['/login']);
        });
      }
    });
  }
}
