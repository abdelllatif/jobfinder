import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../Service/job.service.ts';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-job-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './job-feed.html',
styleUrls: ['./job-feed.css'],
})
export class JobFeedComponent {
  jobs: any[] = [];
  filteredJobs: any[] = [];
    Math = Math;   // expose global Math object

  total = 100;
  // Search & Filters
  searchKeyword: string = '';
  selectedLocation: string = '';
  selectedCompany: string = '';
  dateFilter: string = 'all'; // all, today, week, month
  
  // Pagination
  currentPage = 1;
  pageSize = 10;
  totalJobs = 0;
  totalPages = 0;
  
  // UI State
  loading = false;
  errorMessage = '';
  sidebarOpen = true;
  
  // Filter Options (populated dynamically)
  locations: string[] = [];
  companies: string[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.fetchJobs();
  }

  fetchJobs() {
    this.loading = true;
    this.errorMessage = '';

    this.jobService.getJobs(this.currentPage).subscribe({
      next: (res) => {
        this.jobs = res.results || [];
        this.totalJobs = res.count || this.jobs.length;
        this.extractFilterOptions();
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading jobs. Please try again.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  extractFilterOptions() {
    // Extract unique locations
    const locationSet = new Set<string>();
    const companySet = new Set<string>();
    
    this.jobs.forEach(job => {
      if (job.locations && job.locations[0]?.name) {
        locationSet.add(job.locations[0].name);
      }
      if (job.company?.name) {
        companySet.add(job.company.name);
      }
    });
    
    this.locations = Array.from(locationSet).sort();
    this.companies = Array.from(companySet).sort();
  }

  applyFilters() {
    let filtered = [...this.jobs];

    // Search filter
    if (this.searchKeyword.trim()) {
      const keyword = this.searchKeyword.toLowerCase();
      filtered = filtered.filter(job =>
        job.name?.toLowerCase().includes(keyword) ||
        job.company?.name?.toLowerCase().includes(keyword)
      );
    }

    // Location filter
    if (this.selectedLocation) {
      filtered = filtered.filter(job =>
        job.locations && job.locations[0]?.name === this.selectedLocation
      );
    }

    // Company filter
    if (this.selectedCompany) {
      filtered = filtered.filter(job =>
        job.company?.name === this.selectedCompany
      );
    }

    // Date filter
    const now = new Date();
    filtered = filtered.filter(job => {
      const pubDate = new Date(job.publication_date);
      const diffTime = Math.abs(now.getTime() - pubDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      switch (this.dateFilter) {
        case 'today':
          return diffDays <= 1;
        case 'week':
          return diffDays <= 7;
        case 'month':
          return diffDays <= 30;
        default:
          return true;
      }
    });

    // Sort by date (newest first)
    filtered.sort((a, b) =>
      new Date(b.publication_date).getTime() -
      new Date(a.publication_date).getTime()
    );

    this.filteredJobs = filtered;
    this.totalPages = Math.ceil(this.filteredJobs.length / this.pageSize);
  }

  getPaginatedJobs() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredJobs.slice(start, end);
  }

  search() {
    this.currentPage = 1;
    this.applyFilters();
  }

  resetFilters() {
    this.searchKeyword = '';
    this.selectedLocation = '';
    this.selectedCompany = '';
    this.dateFilter = 'all';
    this.currentPage = 1;
    this.applyFilters();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getRelativeTime(date: string): string {
    const now = new Date();
    const pubDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - pubDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  }
}