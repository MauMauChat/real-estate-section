import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RealEstateService } from '../../../services/real-estate.service'; // Importiere den Service

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.scss'],
  imports: [
    FormsModule,
    RouterModule,
  ],
  standalone: true
})
export class AddRealEstateComponent {
  // Initialisierung des Objekts mit allen Feldern
  newRealEstate = {
    category_name: '',
    type_name: '',
    property_name: '',
    description: '',
    property_address: '',
    city_name: '',
    province_name: '',
    rental_price: 0,
    rental_period: 0,
    advance_payment: 0,
    immediate_availability: true,
    status: 'Open',
    incoming_picture_urls: [],
    type_attributes: {} // Wird dynamisch gesetzt basierend auf dem Typ
  };

  categories = ['Houses', 'Rooms/Apartments'];  // Diese Listen könnten dynamisch vom Backend geladen werden
  types = ['Detached House', 'Apartment', 'Penthouse'];
  cities = ['Graz', 'Vienna', 'Innsbruck'];
  provinces = ['Steiermark', 'Tirol', 'Kärnten'];

  constructor(private realEstateService: RealEstateService) {}

  // Methode zum Absenden der Immobilie
  addRealEstate() {
    console.log('New Real Estate:', this.newRealEstate);

    // Übergabe der neuen Immobilie an den Service
    this.realEstateService.createListing(this.newRealEstate).subscribe({
      next: (response) => {
        console.log('Listing successfully created:', response);
        // Hier kannst du den Nutzer benachrichtigen oder die Seite weiterleiten
      },
      error: (err) => {
        console.error('Error creating listing:', err);
        // Hier kannst du eine Fehlerbehandlung einbauen
      }
    });
  }
}
