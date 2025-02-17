import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent {
  works: any[] = [];
  selectedWork: any = null;
  private languageSubscription!: Subscription;

  constructor(private translate: TranslateService) {
  }
  ngOnInit() {
    this.loadWorks();

    // 📌 Suscribirse al evento de cambio de idioma
    this.languageSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadWorks(); // 🔄 Recargar los trabajos cuando cambia el idioma
    });
  }

  loadWorks() {
    this.translate.onLangChange.subscribe(() => {
      this.translate.get('works.projects').subscribe((translatedWorks) => {
        if (translatedWorks) {
          this.works = translatedWorks;
        } else {
          console.error("Error: No se encontraron proyectos en la traducción.");
        }
      });
    });
  }


  openWorkDetails(work: any) {
    this.selectedWork = work;
    this.disableScroll();
  }

  closeWorkDetails() {
    this.selectedWork = null;
    this.enableScroll();
  }

  private disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  private enableScroll() {
    document.body.style.overflow = 'auto';
  }
}
