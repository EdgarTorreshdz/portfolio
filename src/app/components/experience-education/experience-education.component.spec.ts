import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceEducationComponent } from './experience-education.component';

describe('ExperienceEducationComponent', () => {
  let component: ExperienceEducationComponent;
  let fixture: ComponentFixture<ExperienceEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceEducationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
