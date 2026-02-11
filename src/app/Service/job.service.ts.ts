// core/services/job.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private baseUrl = 'https://www.themuse.com/api/public';

  constructor(private http: HttpClient) {}

  getJobs(page: number = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs?page=${page}`);
  }

  getJobById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/jobs/${id}`);
  }


}
