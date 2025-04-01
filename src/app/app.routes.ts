import { Routes } from '@angular/router';
import { ConversorComponent } from './conversor/conversor.component';

export const routes: Routes = [
  { path: '', redirectTo: 'conversor', pathMatch: 'full' },
  { path: 'conversor', loadComponent: () => ConversorComponent },
];
