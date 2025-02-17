import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RealEstateService } from '../../../services/real-estate.service';

@Component({
  selector: 'app-listing-overview',
  templateUrl: 'listing-uebersicht.component.html',
  styleUrls: ['./listing-overview.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ListingOverviewComponent implements OnInit {
  listings: any[] = [];

  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadListings();
  }

  // Lädt alle Listings aus dem Backend
  loadListings(): void {
    // TODO: Implemented taking the owner_id(user_id) from the JWT
    const owner_id: number = 1;
    this.realEstateService.getAllListingsByOwner(owner_id).subscribe({
      next: (data) => {
        this.listings = data;
      },
      error: (err) => console.error('Fehler beim Laden der Listings:', err)
    });
  }

  // Löscht ein Listing und lädt die Übersicht neu
  deleteListing(listingId: number): void {
    this.realEstateService.deleteListing(listingId).subscribe({
      next: () => {
        console.log('Listing gelöscht:', listingId);
        this.loadListings();
      },
      error: (err) => console.error('Fehler beim Löschen des Listings:', err)
    });
  }

  // Platzhalter: Leitet zur Chat-Komponente weiter (noch zu implementieren)
  goToChat(listingId: number): void {
    console.log('Chat für Listing', listingId);
    // Beispiel: this.router.navigate(['/chat', listingId]);
  }

  // Leitet zur Edit-Komponente weiter und lädt die Detailwerte des Listings
  editListing(listingId: number): void {
    this.router.navigate(['/owner/edit', listingId]);
  }

  // Wechselt den Status des Listings und schickt die Änderung an den Service
  toggleStatus(listing: any): void {
    listing.status = listing.status === 'Open' ? 'Rented' : 'Open';
    this.realEstateService.updateListing(listing).subscribe({
      next: () => console.log('Status aktualisiert für Listing:', listing.listing_id),
      error: (err) => console.error('Fehler beim Aktualisieren des Status:', err)
    });
  }
}
