import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: ':lang', redirectTo: ':lang/about', pathMatch: 'full' },
  { path: ':lang/about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: ':lang/works', loadComponent: () => import('./pages/works/works.component').then(m => m.WorksComponent) },
  { path: '', redirectTo: '/es/about', pathMatch: 'full' },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
