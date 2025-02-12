import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email: string = 'eath2497@gmail.com';
  designed: string = 'eath2497@gmail.com';

  constructor(
    private translate: TranslateService
  ){
    this.translate.setDefaultLang('es');
  }
}
