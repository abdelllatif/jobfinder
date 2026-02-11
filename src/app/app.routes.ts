import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './pages/register/register';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { JobFeedComponent } from './job-feed/job-feed';

export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: Login },
  {path: 'dashboard', component: Profile},
  { path: 'feed', component: JobFeedComponent },

];

export const appConfig = {
  providers: [
    provideHttpClient(),      
    provideRouter(routes),
    importProvidersFrom(FormsModule) 
  ]
};