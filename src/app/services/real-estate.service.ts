import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private apiUrl = 'http://localhost:300';

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getListingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createListing(data: any): Observable<any> {
    return this.http.post<any>("http://localhost:3000/api/immobilien", data);
  }
  updateListing(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${data.listing_id}`, data);
  }

  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Neue Methode zum Abrufen der Anfragen (Requests)
  getAllRequests(): Observable<any> {
    return this.http.get<any>(this.apiUrl);  // Angenommene API-URL für Requests
  }
}
