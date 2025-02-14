import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  private apiUrl = 'https://api.example.com/real-estate';  // Ersetze dies durch deine tatsächliche API-URL

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getListingById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Methode zum Erstellen einer Immobilie
  createListing(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data); // Sende das 'data' an die API
  }

  deleteListing(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
