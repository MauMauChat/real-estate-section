import { Component, OnInit } from '@angular/core';
import {RealEstateService} from '../../../services/real-estate.service';

@Component({
  selector: 'app-request-uebersicht',
  templateUrl: './request-uebersicht.component.html',
  styleUrls: ['./request-uebersicht.component.scss'],
  standalone: true
})
export class RequestUebersichtComponent implements OnInit {
  requests: any[] = [];  // Array zum Speichern der Requests

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit() {
    this.loadRequests();  // Lädt die Anfragen bei der Initialisierung der Seite
  }

  // Lädt alle Requests basierend auf der Listing ID
  loadRequests() {
    const ownerId = 1;  // Beispiel für die Owner ID (kann dynamisch festgelegt werden)
    this.realEstateService.getAllListingsByOwner().subscribe(
      (listings) => {
        // Hole alle Listings des Owners
        const ownerListings = listings.filter(listing => listing.user_id === ownerId);

        // Lade alle Requests für die Listings des Owners
        this.realEstateService.getAllRequestsByRequester().subscribe(
          (requests) => {
            // Filtern von Requests, die zu den Listings des Owners gehören
            this.requests = requests.filter(request =>
              ownerListings.some(listing => listing.listing_id === request.listing_id)
            );
          },
          (error) => {
            console.error('Error loading requests:', error);
          }
        );
      },
      (error) => {
        console.error('Error loading listings:', error);
      }
    );
  }

  // Zeigt die Details einer Anfrage
  viewDetails(request: any) {
    console.log('Details der Anfrage anzeigen:', request);
    // Hier kannst du eine Navigation zur Detailseite der Anfrage einfügen, wenn gewünscht
  }
}
