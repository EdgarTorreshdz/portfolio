import { Component, Output, EventEmitter } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  @Output() navigateToEvent = new EventEmitter<string>();

  constructor(
      private navigationService: NavigationService
    ) {}


    navigate(section: string) {
      this.navigateToEvent.emit(section);
    }
}
