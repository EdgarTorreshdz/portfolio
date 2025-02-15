import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  currentLanguage: string = 'es';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  /**
   * 📌 Obtiene el idioma actual desde la URL
   */
  getCurrentLanguage(): string {
    const segments = this.router.url.split('/');
    return segments[1] || 'es';
  }

  /**
   * 📌 Navega a una nueva sección asegurando que el idioma se mantenga en la URL
   */
  navigateTo(section: string) {
    this.currentLanguage = this.getCurrentLanguage();
    this.router.navigateByUrl(`/${this.currentLanguage}/${section}`).then(() => {
      if (isPlatformBrowser(this.platformId)) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 🔹 Mueve la vista al inicio
      }
    });
  }
}
