import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  menuOpen = false;
  isMobile = false;
  currentSection = 'About Me';

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

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.detectScreenSize(); // 🔹 Detectar tamaño de pantalla al iniciar
      window.addEventListener('resize', this.detectScreenSize.bind(this)); // 🔹 Detectar cambios en el tamaño de pantalla
    }

    // Detectar la ruta actual y actualizar currentSection
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateCurrentSection(event.urlAfterRedirects);
      });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.detectScreenSize.bind(this)); // 🔹 Limpiar el event listener
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }


  }

  detectScreenSize(): void {
    this.isMobile = window.innerWidth < 1024;
    console.log('isMobile:', this.isMobile); // 🔹 Debugging
  }

  navigateTo(route: string, section: string) {
    this.router.navigate([route]);
    this.currentSection = section;
    this.menuOpen = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
  }

  private updateCurrentSection(url: string) {
    const routeMapping: { [key: string]: string } = {
      '/': 'About Me',
      '/works': 'Works',
      '/about': 'About Me',
      '/contact': 'Contact'
    };

    this.currentSection = routeMapping[url] || 'About Me';
  }
}
