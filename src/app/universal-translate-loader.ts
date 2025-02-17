import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root'
})
export class UniversalTranslateLoader implements TranslateLoader {
  private __dirname: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Definir __dirname manualmente para compatibilidad con módulos ESM
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(__filename);
  }

  getTranslation(lang: string): Observable<any> {
    const validLanguages = ['es', 'en']; // Idiomas permitidos

    if (!validLanguages.includes(lang)) {
      console.warn(`⚠️ Se solicitó una traducción no válida: ${lang}, devolviendo objeto vacío.`);
      return new Observable((observer) => {
        observer.next({});
        observer.complete();
      });
    }

    const filePath = join(process.cwd(), 'dist', 'portfolio', 'browser', 'assets', 'i18n', `${lang}.json`);

    try {
      const translations = JSON.parse(readFileSync(filePath, 'utf8'));
      return new Observable((observer) => {
        observer.next(translations);
        observer.complete();
      });
    } catch (error) {
      console.error(`🚨 Error al cargar el archivo: ${filePath}`, error);
      return new Observable((observer) => {
        observer.next({});
        observer.complete();
      });
    }
  }



}
