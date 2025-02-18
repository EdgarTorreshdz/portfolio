import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-education',
  templateUrl: './experience-education.component.html',
  styleUrls: ['./experience-education.component.scss'],
  standalone: true,
  imports: [TranslateModule,CommonModule]
})
export class ExperienceEducationComponent {

  experience = [
    {
      title: 'Desarrollador .NET',
      company: 'Go1 Technologies/ PriceTravel',
      period: 'Desde agosto 2023',
      technologies: '.Net, Angular, Azure, AWS, SQL, NoSQL.',
      description: 'Microservicios, DLL, API, Aplicaciones administrativas.'
    },
    {
      title: 'Desarrollador .NET Jr',
      company: 'Grupo Ultra',
      period: 'Junio 2022 a Julio 2023',
      technologies: '.Net, Nuxt, VueJS, AWS, Progress, SQL.',
      description: 'Microservicios, DLL, API, Aplicaciones administrativas, punto de venta.'
    },
    {
      title: 'Desarrollador FullStack',
      company: 'Novusred',
      period: 'Noviembre 2021 a junio 2023',
      technologies: 'Laravel, PHP, Prestashop, Node, AWS, SQL, MySQL.',
      description: 'Desarrollo y mantenimiento plataforma de venta.'
    },
    {
      title: 'Becario Desarrollador .NET',
      company: 'Ozelot Technologies',
      period: 'Mayo 2020 a Agosto 2020',
      technologies: '.Net, VueJS',
      description: 'Desarrollo de módulo de cuantificaciones de proyectos.'
    }
  ];

  education = [
    {
      title: 'Ing. Desarrollo y Gestión de Software',
      institution: 'Universidad Tecnológica de Cancún',
      period: '2020 a 2022'
    },
    {
      title: 'TSU. Desarrollo de Software Multiplataforma',
      institution: 'Universidad Tecnológica de Cancún',
      period: '2018 a 2020'
    }
  ];
}
