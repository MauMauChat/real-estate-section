import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-filter-browser',
  templateUrl: './filter-browser.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./filter-browser.component.scss']
})
export class FilterBrowserComponent {
  // Beispiel für Filteroptionen
  filters = {
    priceRange: [0, 1000],
    category: ''
  };

  // Funktion zum Anwenden des Filters
  applyFilter() {
    console.log('Filters applied:', this.filters);
    // Hier kann die Logik zum Anwenden der Filter implementiert werden
  }
}
