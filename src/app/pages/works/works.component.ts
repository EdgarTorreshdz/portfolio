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
      image: 'assets/images/works/portfolio.png',
      description: 'Proyecto de portafolio personal con SSR optimizado para SEO.'
    },
    {
      name: 'Ecommerce',
      year: '2023',
      technologies: 'PHP, Prestashop',
      image: 'assets/images/works/novusred.png',
      description: 'Tienda en línea con pasarela de pagos integrada y diseño responsivo.'
    },
    {
      name: 'Regalos Personalizados',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/works/regalos.png',
      description: 'Plataforma de venta de regalos personalizados con catálogo dinámico.'
    },
    {
      name: 'Maistros and Masters',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/works/maistros.png',
      description: 'Sitio web de servicios profesionales y contrataciones en línea.'
    },
    {
      name: 'Recicun',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/works/recicun.png',
      description: 'Sitio web administración de recolección de reciclaje.'
    },
    {
      name: 'BoatsBooking',
      year: '2022',
      technologies: 'Laravel',
      image: 'assets/images/works/boatsbooking.png',
      description: 'Plataforma de renta de barcos.'
    }
  ];



  selectedWork: any = null;



}
