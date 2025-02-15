import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

// ✅ Configuración correcta de la carga de archivos JSON
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: 'works', loadComponent: () => import('./pages/works/works.component').then(m => m.WorksComponent) },
      { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: '**', redirectTo: '' }
    ]),
    provideHttpClient(withFetch()), // ✅ Habilitar `fetch` API
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      })
    ),
    TranslateStore,
    TranslateService
  ]
};
