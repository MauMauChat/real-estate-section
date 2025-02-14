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
    type_attributes: {
      total_floor_area: 0,   // Hardcodiert
      garden: false,         // Hardcodiert
      floor_level: 0,        // Hardcodiert
      balcony: false,        // Hardcodiert
      roof_terrace: false,   // Hardcodiert
      luxury: false          // Hardcodiert
    }
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

  // Methode zum Ändern der Typ-spezifischen Attribute basierend auf dem gewählten Typ
  onTypeChange() {
    // Hardcoding der Typen-spezifischen Attribute
    if (this.newRealEstate.type_name === 'Detached House') {
      this.newRealEstate.type_attributes = { total_floor_area: 100, garden: true, floor_level: 1, balcony: false, roof_terrace: false, luxury: false };
    } else if (this.newRealEstate.type_name === 'Apartment') {
      this.newRealEstate.type_attributes = { total_floor_area: 60, garden: false, floor_level: 3, balcony: true, roof_terrace: false, luxury: false };
    } else if (this.newRealEstate.type_name === 'Penthouse') {
      this.newRealEstate.type_attributes = { total_floor_area: 120, garden: false, floor_level: 10, balcony: false, roof_terrace: true, luxury: true };
    }
  }

  // Methode für den Dateiupload
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const files = Array.from(fileList);
      this.newRealEstate.incoming_picture_urls = files.map(file => URL.createObjectURL(file));
    }
  }
}
