import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../Service/job.service.ts';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.html'
})
export class JobDetails implements OnInit {

  job: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private datePipe: DatePipe
  ) {}
  formatDate(date: string) {
    return this.datePipe.transform(date, 'mediumDate');
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.jobService.getJobById(id).subscribe({
        next: (data) => {
          this.job = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading job details', err);
          this.loading = false;
        }
      });
    }
  }
}
