import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../Service/job.service.ts';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-feed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: '../job-feed/job-feed.html',
  styleUrl: '../job-feed/job-feed.css',
})
export class JobFeedComponent {

  jobs: any[] = [];
  filteredJobs: any[] = [];
  searchKeyword: string = '';
  loading = false;
  errorMessage = '';
  currentPage = 1;

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.loading = true;
    this.errorMessage = '';

    this.jobService.getJobs(this.currentPage).subscribe({
      next: (res) => {
        this.jobs = res.results;
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Error loading jobs';
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredJobs = this.jobs
      .filter(job =>
        job.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )
      .sort((a, b) =>
        new Date(b.publication_date).getTime() -
        new Date(a.publication_date).getTime()
      )
      .slice(0, 10); // 10 per page
  }

  search() {
    this.applyFilters();
  }

  nextPage() {
    this.currentPage++;
    this.fetchJobs();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchJobs();
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
