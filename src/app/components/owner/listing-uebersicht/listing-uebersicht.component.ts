import { Component, OnInit } from '@angular/core';
import {RealEstateService} from '../../../services/real-estate.service';

@Component({
  selector: 'app-listing-overview',
  templateUrl: './listing-overview.component.html',
  styleUrls: ['./listing-overview.component.scss'],
  standalone: true
})
export class ListingUebersichtComponent implements OnInit {
  listings: any[] = []; // Array für die Immobilien des Eigentümers

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit() {
    this.loadOwnerListings(); // Lädt die Immobilien des Eigentümers
  }

  // Lädt alle Listings des Eigentümers
  loadOwnerListings() {
    const ownerId = 1; // Beispiel für die ID des Eigentümers
    this.realEstateService.getAllListings().subscribe(
      (data) => {
        this.listings = data.filter(listing => listing.user_id === ownerId); // Filtert nur die Listings des Eigentümers
      },
      (error) => {
        console.error('Error loading listings:', error);
      }
    );
  }

  // Funktion zum Aktualisieren des Status (Open/Rented)
  updateStatus(listing: any) {
    this.realEstateService.updateListing(listing).subscribe(
      (response) => {
        console.log('Listing status updated:', response);
      },
      (error) => {
        console.error('Error updating listing status:', error);
      }
    );
  }

  // Funktion zum Weiterleiten zur Chat-Seite
  goToChat(listingId: number) {
    // Hier wird die Chat-Seite aufgerufen, z.B. durch Router Navigation (kann durch URL oder Parameter geschehen)
    console.log('Navigating to chat for listing ID:', listingId);
    // Beispiel: this.router.navigate(['/chat', listingId]);
  }

// Funktion zum Löschen eines Listings
  deleteListing(listingId: number) {
    this.realEstateService.deleteListing(listingId).subscribe(
      () => {
        // Entferne das gelöschte Listing aus der Liste
        this.listings = this.listings.filter(listing => listing.listing_id !== listingId);
        console.log('Listing deleted:', listingId);
      },
      (error) => {
        console.error('Error deleting listing:', error);
      }
    );
  }
}
