import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
    this.translate.get('about.description').subscribe((translatedText: string) => {
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

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY + window.innerHeight;
    const companiesElement = document.getElementById('companies-section');
    const skillsElement = document.getElementById('skills-section');

    if (companiesElement && !this.companiesLoaded && scrollPosition > companiesElement.offsetTop) {
      this.companiesLoaded = true;
    }

    if (skillsElement && !this.skillsLoaded && scrollPosition > skillsElement.offsetTop) {
      this.skillsLoaded = true;
    }
  }
}
