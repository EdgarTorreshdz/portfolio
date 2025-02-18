import { Component, OnInit, OnDestroy,ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from '../companies/companies.component';
import { SkillsComponent } from '../skills/skills.component';
import { ExperienceEducationComponent } from '../../components/experience-education/experience-education.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, CompaniesComponent, SkillsComponent, TranslateModule,ExperienceEducationComponent]
})
export class AboutComponent implements OnInit, OnDestroy {
  animatedText: string = '';
  typingSpeed: number = 50;
  private translationSubscription: Subscription | undefined;
  companiesLoaded = false;
  skillsLoaded = false;
  experienceLoaded = false;
  @ViewChild('companiesSection') companiesSection!: ElementRef;
  @ViewChild('skillsSection') skillsSection!: ElementRef;
  @ViewChild('experienceSection') experienceSection!: ElementRef;

  constructor(
    private translate: TranslateService,
    private navigationService: NavigationService
  ) {}

  ngOnInit() {
    this.getTranslatedText();
    this.translationSubscription = this.translate.onLangChange.subscribe(() => {
      this.getTranslatedText();
    });
  }

  ngOnDestroy() {
    if (this.translationSubscription) {
      this.translationSubscription.unsubscribe();
    }
  }

  getTranslatedText() {
    this.translate.get('about.job').subscribe((translatedText: string) => {
      this.startTypingAnimation(translatedText);
    });
  }

  startTypingAnimation(textToType: string, index: number = 0) {
    if (index < textToType.length) {
      this.animatedText = textToType.slice(0, index + 1);
      setTimeout(() => this.startTypingAnimation(textToType, index + 1), this.typingSpeed);
    }
  }

  sendEmail() {
    window.location.href = `mailto:eath2497@gmail.com`;
  }

  navigateTo(section: string) {
    if (typeof section === 'string') {
      this.navigationService.navigateTo(section);
    }
  }

  openCompanyUrl(url: string) {
    window.open(url, '_blank');
  }



  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.setupIntersectionObserver();
    }
  }

  setupIntersectionObserver() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === this.companiesSection.nativeElement) {
              this.companiesLoaded = true;
            } else if (entry.target === this.skillsSection.nativeElement) {
              this.skillsLoaded = true;
            } else if (entry.target === this.experienceSection.nativeElement) {
              this.experienceLoaded = true;
              entry.target.classList.add('fade-in-visible'); // 🔹 Asegurar que la clase se añade
            }
          }
        });
      }, observerOptions);

      if (this.companiesSection) observer.observe(this.companiesSection.nativeElement);
      if (this.skillsSection) observer.observe(this.skillsSection.nativeElement);
      if (this.experienceSection) observer.observe(this.experienceSection.nativeElement);
    } else {
      console.warn('IntersectionObserver no está disponible en este entorno.');
    }
  }

  getCVLink(): string {
    const lang = this.translate.currentLang || 'es';
    return lang === 'es' ? 'assets/documents/Edgar_Torres_CV.pdf' : 'assets/documents/Edgar_Torres_CV_Eng.pdf';
  }
}
