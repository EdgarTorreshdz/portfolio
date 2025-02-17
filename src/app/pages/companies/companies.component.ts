import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})

export class CompaniesComponent implements OnInit {
  companies = [
    { name: 'PriceTravel', logo: 'assets/logos/pricetravel.png', url: 'https://www.pricetravel.com/' },
    { name: 'Go1 Technologies', logo: 'assets/logos/go1.png', url: 'https://www.go1.mx/' },
    { name: 'Novusred', logo: 'assets/logos/novusred.png', url: 'https://www.novusred.mx/' },
    { name: 'Ozelot Technologies', logo: 'assets/logos/ozelot.png', url: 'https://www.ozelottech.com/' },
    { name: 'BoatsBooking', logo: 'assets/logos/boatsbooking.png', url: 'https://www.boatsbooking.com/' },
    { name: 'Maistros and Masters', logo: 'assets/logos/maistros.png', url: 'https://www.maistrosmasters.com/' },
    { name: 'Recicun', logo: 'assets/logos/recicun.png', url: 'https://www.recicun.com/' },
    { name: 'Regalos Personalizados Cancún', logo: 'assets/logos/regalos.png', url: 'https://www.regalospersonalizados.com/' }
  ];
  constructor() {}

  ngOnInit(): void {}

  openCompanyUrl(url: string) {
    window.open(url, '_blank');
  }
}
