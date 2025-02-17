import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  // Gemeinsamer Nenner: Basis-URL der API
  private readonly BASE_URL = 'http://localhost:3000';
  // Spezifische Endpunkte
  private readonly REAL_ESTATE_ENDPOINT = '/api/immobilien';
  private readonly REQUESTS_ENDPOINT = '/api/immobilien/requests';

  constructor(private http: HttpClient) {}

  // Beispiel: Alle Listings abrufen
  getAllListingsBasedOnCriteria(): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}`);
  }

  // Anfragen (Requests) abrufen
  getAllRequestsByRequester(requester_id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}${this.REQUESTS_ENDPOINT}`);
  }

  // Alle Listings eines bestimmten Eigentümers abrufen
  getAllListingsByOwner(owner_id: number = 1): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}`);
  }

  // Ein einzelnes Listing anhand der ID abrufen
  getListingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}/${id}`);
  }

  // Neues Listing erstellen
  createListing(data: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}`, data);
  }

  // Bestehendes Listing aktualisieren
  updateListing(data: any): Observable<any> {
    return this.http.put<any>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}/${data.listing_id}`, data);
  }

  // Listing löschen
  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}${this.REAL_ESTATE_ENDPOINT}/${id}`);
  }
}
