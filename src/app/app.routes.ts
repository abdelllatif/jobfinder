import { provideRouter, Routes } from '@angular/router';
import { SignupComponent } from './pages/register/register';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signup', component: SignupComponent }];

export const appConfig = {
  providers: [
    provideHttpClient(),        // ✅ مهم باش HttpClientService يخدم
    provideRouter(routes),
    importProvidersFrom(FormsModule) // باش [(ngModel)] يخدم
  ]
};