import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../../../services/real-estate.service'; // Importiere den Service
import { Router } from '@angular/router';
import {CommonModule, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { categories, types, cities, provinces } from '../../../data/data';

@Component({
  selector: 'app-search-browser',
  templateUrl: './search-browser.component.html',
  styleUrls: ['./search-browser.component.scss'],
  imports: [
    CommonModule,
    FormsModule,

  ],
  standalone: true
})
export class SearchBrowserComponent implements OnInit {
  // Originale Liste aller Immobilien
  listings: any[] = [];
  // Gefilterte Liste, die angezeigt wird
  filteredListings: any[] = [];

  // Filter-Objekt mit Standardwerten
  filter: any = {
    searchText: '',
    category: '',
    type: '',
    priceMin: null,
    priceMax: null,
    rentalPeriod: null,
    province: '',
    city: '',
    immediateAvailability: '',
    // Neue Felder:
    floorArea: null,
    garden: '',
    floorLevel: null,
    balcony: '',
    roofTerrace: '',
    luxury: ''
  };


  // Beispielwerte für Dropdowns (können auch aus einem Service stammen)
  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;

  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAllListings();
  }

  // Ruft alle Immobilien ab und initialisiert filteredListings
  getAllListings() {
    this.realEstateService.getAllListings().subscribe({
      next: (response) => {
        this.listings = response;
        this.filteredListings = response;
      },
      error: (err) => {
        console.error('Error fetching listings:', err);
      }
    });
  }

  // Wendet die Filterkriterien auf die Listings an
  applyFilter() {
    this.filteredListings = this.listings.filter((listing: any) => {
      // Filter: Name oder Beschreibung enthalten den Suchtext
      const searchTextMatch = this.filter.searchText ?
        (listing.property_name.toLowerCase().includes(this.filter.searchText.toLowerCase()) ||
          listing.description.toLowerCase().includes(this.filter.searchText.toLowerCase())) : true;

      // Filter: Kategorie, falls ausgewählt
      const categoryMatch = this.filter.category ? listing.category_name === this.filter.category : true;
      // Filter: Typ, falls ausgewählt
      const typeMatch = this.filter.type ? listing.type_name === this.filter.type : true;
      // Filter: Preisbereich
      const priceMatch = (this.filter.priceMin == null || listing.rental_price >= this.filter.priceMin) &&
        (this.filter.priceMax == null || listing.rental_price <= this.filter.priceMax);
      // Filter: Mietdauer
      const periodMatch = this.filter.rentalPeriod == null || listing.rental_period === this.filter.rentalPeriod;
      // Filter: Provinz und Stadt
      const provinceMatch = this.filter.province ? listing.province_name === this.filter.province : true;
      const cityMatch = this.filter.city ? listing.city_name === this.filter.city : true;
      // Filter: Sofortverfügbarkeit
      const availabilityMatch = this.filter.immediateAvailability !== '' ?
        String(listing.immediate_availability) === this.filter.immediateAvailability : true;

      return searchTextMatch && categoryMatch && typeMatch && priceMatch &&
        periodMatch && provinceMatch && cityMatch && availabilityMatch;
    });
  }

  // Gibt die URL des ersten Bildes zurück (oder einen Platzhalter)
  getPictureUrl(listing: any): string {
    if (listing.incoming_picture_urls && listing.incoming_picture_urls.length > 0) {
      return listing.incoming_picture_urls[0];
    }
    return 'assets/images/placeholder.png';
  }

  // Navigiert zur Detailseite einer Immobilie
  viewDetails(listingId: number) {
    this.router.navigate(['/tenant/details', listingId]);
  }

  // Navigiert zur Request-Seite oder löst einen Request aus
  sendRequest(listingId: number) {
    console.log("Send request for listing", listingId);
    this.router.navigate(['/tenant/request', listingId]);
  }
}
