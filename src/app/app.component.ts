import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent]
})
export class AppComponent implements OnInit {
  currentLanguage: string = 'es';
  title: string = 'Edgar Torres Portfolio';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    // 🔹 Detectar cambios en la URL y actualizar el idioma y la sección activa
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      const lang = this.getLanguageFromUrl();
      this.setLanguage(lang);
    });

    // 🔹 Configurar el idioma inicial basado en la URL
    const lang = this.getLanguageFromUrl();
    this.setLanguage(lang);
  }

  /**
   * 📌 Obtiene el idioma desde la URL
   */
  private getLanguageFromUrl(): string {
    const segments = this.router.url.split('/');
    return segments[1] || 'es'; // 🔹 Primer segmento de la URL es el idioma
  }

  /**
   * 📌 Aplica el idioma desde la URL a ngx-translate
   */
  setLanguage(lang: string) {
    if (this.currentLanguage !== lang) {
      this.currentLanguage = lang;
      this.translate.use(lang);
    }
  }

  /**
   * 📌 Cambia el idioma y mantiene la sección actual en la URL
   */
  changeLanguage(lang: string) {
    const currentPath = this.router.url.split('/').slice(2).join('/'); // 🔹 Mantiene la sección actual
    this.router.navigateByUrl(`/${lang}/${currentPath}`);
  }
}
