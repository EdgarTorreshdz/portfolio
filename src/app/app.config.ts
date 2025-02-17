import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core'; // Importa TranslateLoader
import { UniversalTranslateLoader } from './universal-translate-loader'; // Importa el loader personalizado

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: 'works', loadComponent: () => import('./pages/works/works.component').then(m => m.WorksComponent) },
      { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: '**', redirectTo: '' } // Usa '**' para capturar todas las rutas no definidas
    ]),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: UniversalTranslateLoader // Usa el loader personalizado
        }
      })
    ),
    TranslateStore,
    TranslateService
  ]
};
