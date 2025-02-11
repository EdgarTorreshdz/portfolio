import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

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

  constructor(private translate: TranslateService) {}

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

  startTypingAnimation(textToType: string) {
    let index = 0;
    this.animatedText = '';
    const interval = setInterval(() => {
      if (index < textToType.length) {
        this.animatedText += textToType[index];
        index++;
      } else {
        clearInterval(interval); // Detener la animación cuando termine
      }
    }, this.typingSpeed);
  }
}
