import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-works',
  standalone: true, // 🔹 Asegura que el componente sea independiente
  imports: [CommonModule, TranslateModule], // 🔹 Agrega TranslateModule
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent { }
