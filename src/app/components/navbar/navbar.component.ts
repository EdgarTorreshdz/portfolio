import { Component, HostListener, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  menuOpen = false;
  isMobile = false;
  currentSection = 'about';
  currentLanguage: string = 'es';
  showDropdown = false;
  languages = [
    { code: 'es', label: 'Español', flag: 'assets/icons/es_ES.png' },
    { code: 'en', label: 'English', flag: 'assets/icons/en_US.png' }
  ];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.detectScreenSize();
      window.addEventListener('resize', this.detectScreenSize.bind(this));
    }

    // Detectar cambios de ruta para actualizar idioma y sección activa
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentLanguage = this.getLanguageFromUrl();
      this.currentSection = this.getActiveSection();
      this.translate.use(this.currentLanguage);
    });

    // Configurar valores iniciales
    this.currentLanguage = this.getLanguageFromUrl();
    this.currentSection = this.getActiveSection();
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.detectScreenSize.bind(this));
    }
  }

  /**
   * 📌 Detecta el tamaño de pantalla y actualiza `isMobile`
   */
  detectScreenSize(): void {
    this.isMobile = window.innerWidth < 1515;
  }

  /**
   * 📌 Obtiene el idioma desde la URL
   */
  private getLanguageFromUrl(): string {
    const segments = this.router.url.split('/');
    return segments[1] || 'es';
  }

  /**
   * 📌 Obtiene la sección activa desde la URL
   */
  private getActiveSection(): string {
    const segments = this.router.url.split('/');
    return segments[2] || 'about';
  }

  getOtherLanguage() {
      return this.languages.filter(lang => lang.code !== this.currentLanguage);
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  switchLanguage(lang: string) {
    if (lang !== this.currentLanguage) {
      this.translate.use(lang);
      this.currentLanguage = lang;
      this.showDropdown = false;
      const currentPath = this.router.url.split('/').slice(2).join('/');
      this.router.navigateByUrl(`/${lang}/${currentPath}`);
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.showDropdown = false;
    }
  }

  /**
   * 📌 Navega a una nueva sección asegurando que el idioma se mantenga en la URL
   */
  navigateTo(section: string) {
    this.navigationService.navigateTo(section);
    this.currentSection = section;
    this.menuOpen = false; // Cierra el menú en móviles
  }


  /**
   * 📌 Alterna el menú en dispositivos móviles
   */
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  getTranslatedSectionName(): string {
    const sectionTranslationKeys: { [key: string]: string } = {
      'about': 'menu.about',
      'works': 'menu.works',
      'contact': 'menu.contact'
    };

    const translationKey = sectionTranslationKeys[this.currentSection] || 'menu.about';
    return this.translate.instant(translationKey); // 🔹 Obtiene el valor traducido inmediatamente
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.scrollY > 50) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }

    // 🔹 Ajusta la posición del navbar dinámicamente
    const navbar = document.querySelector('.navbar') as HTMLElement;

  }

}
