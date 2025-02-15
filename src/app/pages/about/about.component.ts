import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, OnDestroy {
  email: string = 'eath2497@gmail.com';
  animatedText: string = '';
  typingSpeed: number = 50; // Velocidad de escritura (ms por letra)
  private translationSubscription: Subscription | undefined;
  currentSection = 'About Me';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private navigationService: NavigationService,
  ) {}

  ngOnInit() {
    this.getTranslatedText(); // Cargar el texto inicial

    // 🔹 Suscribirse a cambios de idioma para actualizar el texto
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
      this.animatedText = textToType.slice(0, index + 1); // 🔹 Solo tomamos la parte escrita correctamente
      setTimeout(() => this.startTypingAnimation(textToType, index + 1), this.typingSpeed);
    }
  }
  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }

  navigateTo(section: string) {
    this.navigationService.navigateTo(section);
    this.currentSection = section;
  }


}
