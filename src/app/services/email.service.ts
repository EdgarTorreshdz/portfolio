import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmailData } from '../models/email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'https://edgartorres.dev/api/sendEmail';

  constructor(private http: HttpClient) {}

  sendEmail(data: EmailData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
