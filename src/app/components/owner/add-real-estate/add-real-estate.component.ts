import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealEstateService } from '../../../services/real-estate.service';
import {CommonModule} from '@angular/common';
import {RealEstate} from '../../../models/real-estate.model'; // Importiere den Service
import { categories, types, cities, provinces } from '../../../data/data';

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
  newRealEstate: RealEstate = {} as RealEstate ;

  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;
    defaultRealEstate: RealEstate = {
    real_estate_id: 1,
    user_id: 1001,
    category_name: "Wohnung",
    type_name: "Penthouse",
    property_name: "Luxus-Penthouse mit Skyline-Blick",
    description: "Exklusive 4-Zimmer-Wohnung mit modernster Ausstattung und Dachterrasse.",
    property_address: "Musterstraße 12, 10115 Berlin",
    city_name: "Berlin",
    province_name: "Berlin",
    rental_price: 3500,
    rental_period: 12, // Monate
    advance_payment: 3, // Kaution in Monatsmieten
    immediate_availability: true,
    status: "verfügbar",
    pictures: [], // Bilder bleiben uninitialisiert
    type_attributes: {
      wohnflaeche: "180m²",
      zimmer: 4,
      baujahr: 2020,
      heizung: "Fußbodenheizung",
      energieeffizienzklasse: "A+"
    }
  };

  constructor(private realEstateService: RealEstateService) {}

  // Methode zum Absenden der Immobilie
  addRealEstate() {
    this.realEstateService.createListing(this.defaultRealEstate).subscribe({
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

  createPictureArray(event: any) {
    const fileList: FileList = event.target.files; // Holt die ausgewählten Dateien
    if (fileList.length > 0) {
      this.newRealEstate.pictures = Array.from(fileList); // Speichert die Dateien in einem Array
    }
  }

}
