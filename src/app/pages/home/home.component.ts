import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent {
  title = '¡Bienvenido a mi portafolio!';
  description = 'Soy un desarrollador fullstack con experiencia en frontend y backend.';
}
