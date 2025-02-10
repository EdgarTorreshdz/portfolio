import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isScrolled = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translate.setDefaultLang('es');
    if (isPlatformBrowser(this.platformId)) {
      const savedLanguage = localStorage.getItem('language') || 'es';
      this.translate.use(savedLanguage);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
  }
}
