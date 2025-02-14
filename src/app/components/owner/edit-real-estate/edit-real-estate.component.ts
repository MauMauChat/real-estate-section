import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {RealEstateService} from '../../../services/real-estate.service';

@Component({
  selector: 'app-edit-real-estate',
  templateUrl: './edit-real-estate.component.html',
  styleUrls: ['./edit-real-estate.component.scss'],
  imports: [
    FormsModule,
    RouterModule,
  ],
  standalone: true
})
export class EditRealEstateComponent implements OnInit {
  // Initialisiere ein Objekt für die Immobilien-Daten
  realEstateToEdit = {
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
    category_name: '',
    type_name: '',
  };

  categories = ['Häuser', 'Wohnungen', 'Büros']; // Beispiel Kategorien
  types = ['Detached House', 'Apartment', 'Penthouse']; // Beispiel Typen
  cities = ['Graz', 'Innsbruck', 'Salzburg']; // Beispiel Städte
  provinces = ['Steiermark', 'Tirol', 'Salzburg']; // Beispiel Provinzen

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit() {
    const listingId = 1; // Beispiel-Listing-ID, dies muss dynamisch gesetzt werden
    this.loadRealEstate(listingId);
  }

  // Lädt die bestehenden Immobilien-Daten vom Backend
  loadRealEstate(listingId: number) {
    this.realEstateService.getListingById(listingId).subscribe(
      (data) => {
        this.realEstateToEdit = data;
      },
      (error) => {
        console.error('Error loading real estate data:', error);
      }
    );
  }

  // Funktion zum Bearbeiten der Immobilie
  editRealEstate() {
    this.realEstateService.updateListing(this.realEstateToEdit).subscribe(
      (response) => {
        console.log('Real Estate successfully updated:', response);
      },
      (error) => {
        console.error('Error updating real estate:', error);
      }
    );
  }
}
