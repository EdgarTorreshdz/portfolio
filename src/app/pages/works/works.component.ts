import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent {

  works = [
    {
      name: 'Portfolio',
      year: '2025',
      technologies: 'Angular, .NET Core',
      image: 'assets/images/portfolio.png',
      hoverImage: 'assets/images/portfolio-hover.png',
      description: 'Proyecto de portafolio personal con SSR optimizado para SEO.'
    },
    {
      name: 'Ecommerce',
      year: '2023',
      technologies: 'PHP, Prestashop',
      image: 'assets/images/novusred.png',
      hoverImage: 'assets/images/novusred-hover.png',
      description: 'Tienda en línea con pasarela de pagos integrada y diseño responsivo.'
    },
    {
      name: 'Regalos Personalizados',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/regalos_personalizados.png',
      hoverImage: 'assets/images/regalos_personalizados-hover.png',
      description: 'Plataforma de venta de regalos personalizados con catálogo dinámico.'
    },
    {
      name: 'Maistros and Masters',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/maistros_masters.png',
      hoverImage: 'assets/images/maistros_masters-hover.png',
      description: 'Sitio web de servicios profesionales y contrataciones en línea.'
    }
  ];

  companies = [
    { name: 'PriceTravel', logo: 'assets/logos/pricetravel.png', url: 'https://www.pricetravel.com/' },
    { name: 'Go1 Technologies', logo: 'assets/logos/go1.png', url: 'https://www.go1.mx/' },
    { name: 'Maistros and Masters', logo: 'assets/logos/maistros.png', url: 'https://www.maistrosmasters.com/' },
    { name: 'Novusred', logo: 'assets/logos/novusred.png', url: 'https://www.novusred.mx/' },
    { name: 'Ozelot Technologies', logo: 'assets/logos/ozelot.png', url: 'https://www.ozelottech.com/' },
    { name: 'Recicun', logo: 'assets/logos/recicun.png', url: 'https://www.recicun.com/' },
    { name: 'BoatsBooking', logo: 'assets/logos/boatsbooking.png', url: 'https://www.boatsbooking.com/' },
    { name: 'Regalos Personalizados Cancún', logo: 'assets/logos/regalos.png', url: 'https://www.regalospersonalizados.com/' }
  ];

  selectedWork: any = null;

  openCompanyUrl(url: string): void {
    window.open(url, '_blank');
  }

  openModal(work: any): void {
    this.selectedWork = work;

    // 🔹 Espera un pequeño tiempo para asegurarse de que el DOM se actualiza antes de desplazar
    setTimeout(() => {
      const modal = document.querySelector('.modal-content');
      if (modal) {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  }

  closeModal(): void {
    this.selectedWork = null;
  }
}
