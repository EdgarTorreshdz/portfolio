import { EmailService } from './../../services/email.service';
import { EmailData } from './../../models/email';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

declare var grecaptcha: any;

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule,TranslateModule],
})

export class ContactComponent {
  contactForm: FormGroup;
  messageSent = false;

  constructor(private fb: FormBuilder, private emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: [''],
    });
  }

  sendMessage() {
    if (this.contactForm.valid) {
      grecaptcha.ready(() => {
        grecaptcha.execute('6LeWp9sqAAAAADCpaJaQrIv1q7Dln99yzs0XcAPb', { action: 'submit' }).then((token: string) => {
          console.log('reCAPTCHA token:', token); // Verifica que obtienes un token válido
          this.contactForm.patchValue({ recaptcha: token });

          const emailData: EmailData = this.contactForm.value;
          console.log('Enviando datos:', emailData); // Verifica qué datos estás enviando

          this.emailService.sendEmail(emailData).subscribe(
            () => {
              console.log('Correo enviado con éxito');
              this.messageSent = true;
              this.contactForm.reset();
            },
            (error) => {
              console.error('Error enviando el correo', error);
            }
          );
        }).catch((error : string) => {
          console.error('Error en reCAPTCHA:', error);
        });
      });
    } else {
      console.warn('Formulario inválido:', this.contactForm.errors);
    }
  }

}
