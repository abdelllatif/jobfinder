// job-feed.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-job-feed',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="job-feed">
      <h2 class="text-2xl font-bold mb-4">Job Feed</h2>
      <div *ngFor="let job of jobs$ | async" class="job-card p-4 mb-3 bg-white rounded shadow">
        <h3 class="font-semibold">{{ job.title }}</h3>
        <p>{{ job.company }} - {{ job.location }}</p>
        <a [href]="job.url" target="_blank" class="text-blue-600 underline">View Job</a>
      </div>
    </div>
  `
})
export class JobFeedComponent {
  jobs$: Observable<any[]>;

  constructor(private http: HttpClient) {
    // Replace with your public API or aggregated API
    this.jobs$ = this.http.get<any[]>('/api/jobs');
  }
}
