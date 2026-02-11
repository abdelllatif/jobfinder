import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../Service/job.service.ts';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  selector: 'app-job-details',
  templateUrl: './job-details.html',
  styleUrls: ['./job-details.css'],
  imports: [CommonModule, RouterLink],
})
export class JobDetails implements OnInit {
  job: any;
  loading = true;
  similarJobs: any[] = [];
  loadingSimilar = false;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
  ) {}

 ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.jobService.getJobById(id).subscribe({
        next: (data) => {
          this.job = data;
          this.loading = false;

          // Once job is loaded, load similar jobs
          this.loadSimilarJobs();
        },
        error: (err) => {
          console.error('Error loading job details', err);
          this.loading = false;
        }
      });
    }
  }

  loadSimilarJobs(): void {
    if (!this.job) return;

    this.loadingSimilar = true;

    this.jobService.getJobs().subscribe({
      next: (data: any) => {
      this.similarJobs = data.results.filter((j: any) => {
  if (j.id === this.job.id) return false; // skip current job

  // Condition 1: levels match
  const levelsMatch = j.levels?.some((l: any) =>
    this.job.levels?.map((jl: any) => jl.name).includes(l.name)
  );

  // Condition 2: locations match
  const locationsMatch = j.locations?.some((loc: any) =>
    this.job.locations?.map((jl: any) => jl.name).includes(loc.name)
  );

  // Condition 3: type match
  const typeMatch = j.type === this.job.type;

  // Keep job if at least 2 out of 3 conditions match
  const matchCount = [levelsMatch, locationsMatch, typeMatch].filter(Boolean).length;
  return matchCount >= 2;
});


        this.loadingSimilar = false;
      },
      error: (err) => {
        console.error('Error loading similar jobs', err);
        this.loadingSimilar = false;
      }
    });
  }

}
