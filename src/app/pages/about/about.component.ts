import { Component, OnInit, OnDestroy,ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { NavigationService } from '../../services/navigation.service';
import { CommonModule } from '@angular/common';
import { CompaniesComponent } from '../companies/companies.component';
import { SkillsComponent } from '../skills/skills.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [CommonModule, CompaniesComponent, SkillsComponent, TranslateModule]
})
export class AboutComponent implements OnInit, OnDestroy {
  animatedText: string = '';
  typingSpeed: number = 50;
  private translationSubscription: Subscription | undefined;
  companiesLoaded = false;
  skillsLoaded = false;
  @ViewChild('companiesSection') companiesSection!: ElementRef;
  @ViewChild('skillsSection') skillsSection!: ElementRef;
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
            }
          }
        });
      }, observerOptions);

      if (this.companiesSection) {
        observer.observe(this.companiesSection.nativeElement);
      }
      if (this.skillsSection) {
        observer.observe(this.skillsSection.nativeElement);
      }
    } else {
      console.warn('IntersectionObserver no está disponible en este entorno.');
    }
  }

}
