import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealEstateService } from '../../../services/real-estate.service';
import {RouterModule} from '@angular/router';  // Importiere den Service, falls benötigt

@Component({
  selector: 'app-filter-browser',
  templateUrl: './filter-browser.component.html',
  styleUrls: ['./filter-browser.component.scss'],
  imports: [
    FormsModule,
    RouterModule
  ],
  standalone: true
})
export class FilterBrowserComponent {
  // Initialisierung der Filteroptionen
  filters = {
    priceRange: [0, 1000],   // Preisbereich
    category: '',            // Kategorie
    type: '',                // Immobilientyp
    city: '',                // Stadt
    province: '',            // Provinz
    availability: '',        // Verfügbarkeit
    status: ''               // Status (Open/Rented)
  };

  // Beispielkategorien, Typen, Städte und Provinzen
  categories = ['Houses', 'Rooms/Apartments'];
  types = ['Detached House', 'Apartment', 'Penthouse'];
  cities = ['Graz', 'Vienna', 'Innsbruck'];
  provinces = ['Steiermark', 'Tirol', 'Kärnten'];

  constructor(private realEstateService: RealEstateService) {}

  // Methode zum Anwenden des Filters
  applyFilter() {
    console.log('Filters applied:', this.filters);

    // Filterdaten an den RealEstateService senden, um gefilterte Ergebnisse zu erhalten
    this.realEstateService.getAllListings().subscribe({
      next: (response) => {
        console.log('Filtered listings:', response);
        // Hier kannst du die Ergebnisse anzeigen oder verarbeiten
      },
      error: (err) => {
        console.error('Error applying filter:', err);
        // Hier kannst du eine Fehlerbehandlung einbauen
      }
    });
  }
}
