import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealEstateService } from '../../../services/real-estate.service';
import {CommonModule} from '@angular/common';
import {RealEstate} from '../../../models/real-estate.model'; // Importiere den Service
import { categories, types, cities, provinces } from '../../../data/data';  // Importiere die Daten

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
  ],
  standalone: true
})
export class AddRealEstateComponent {
  // Initialisierung des Objekts mit allen Feldern
  newRealEstate: RealEstate = {
    real_estate_id: 0,
    user_id: 0,
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


  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;

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



  // Methode für den Dateiupload
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const files = Array.from(fileList);
      this.newRealEstate.incoming_picture_urls = files.map(file => URL.createObjectURL(file));
    }
  }
}
