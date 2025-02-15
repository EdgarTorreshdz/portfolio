import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { WorksComponent } from './pages/works/works.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: ':lang', redirectTo: ':lang/about', pathMatch: 'full' }, // Redirigir al home con idioma
  { path: ':lang/about', component: AboutComponent },
  { path: ':lang/works', component: WorksComponent },
  { path: '', redirectTo: '/es/about', pathMatch: 'full' }, // Redirigir por defecto a español
  { path: '**', component: NotFoundComponent } // Página 404
];
