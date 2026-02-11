import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../core/models/User';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  checkEmailExists(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }
   // Login and return user without password
  login(email: string, password: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            const { password, ...safeUser } = users[0]; // remove password
            return safeUser as User;
          }
          return null;
        })
      );
  }
 getUserByEmail(email: string) {
  return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
}

}
