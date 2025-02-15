import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../../../services/real-estate.service'; // Importiere den Service
import { Router } from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-search-browser',
  templateUrl: './search-browser.component.html',
  styleUrls: ['./search-browser.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class SearchBrowserComponent implements OnInit {
  listings: any[] = []; // Diese Liste wird alle Immobilien enthalten

  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllListings(); // Hole alle Immobilien beim Laden der Seite
  }

  // Alle Immobilien abrufen
  getAllListings() {
    this.realEstateService.getAllListings().subscribe({
      next: (response) => {
        this.listings = response; // Speichere die erhaltenen Immobilien in der Liste
      },
      error: (err) => {
        console.error('Error fetching listings:', err);
      }
    });
  }

  // Zum Filter-Browser navigieren
  goToFilter() {
    this.router.navigate(['/filter']); // Navigiere zu der Filter-Seite
  }

  // Detail-Seite für die Immobilie aufrufen
  viewDetails(listingId: number) {
    this.router.navigate(['/tenant/details', listingId]); // Navigiere zur Detail-Seite der Immobilie
  }
}
