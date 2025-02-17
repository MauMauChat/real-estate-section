import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RealEstateService } from '../../../services/real-estate.service';
import { categories, types, cities, provinces } from '../../../data/data';
import { RealEstate } from '../../../models/real-estate.model';

@Component({
  selector: 'app-edit-real-estate',
  templateUrl: './edit-real-estate.component.html',
  styleUrls: ['./edit-real-estate.component.scss'],
  imports: [
    FormsModule,
    RouterModule,
    CommonModule
  ],
  standalone: true
})
export class EditRealEstateComponent implements OnInit {
  realEstateToEdit: RealEstate = {} as RealEstate;

  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;

  constructor(
    private realEstateService: RealEstateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const listingId = Number(params.get('id'));
      if (listingId) {
        this.loadRealEstate(listingId);
      } else {
        console.error('Keine gültige Listing-ID in der URL gefunden.');
      }
    });
  }

  // Lädt die bestehenden Immobilien-Daten vom Backend
  loadRealEstate(listingId: number) {
    this.realEstateService.getListingById(listingId).subscribe(
      (data) => {
        // Falls das Backend die ID nicht liefert, hier ergänzen:
        this.realEstateToEdit = { ...data, real_estate_id: listingId };
      },
      (error) => {
        console.error('Error loading real estate data:', error);
      }
    );
  }

  // Wandelt die ausgewählten Dateien in ein Array von File-Objekten um
  createPictureArray(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.realEstateToEdit.pictures = Array.from(fileList);
    }
  }

  // Optional: Erzeugt eine URL für die Vorschau eines Bildes (File oder bereits vorhandene URL)
  getPictureUrl(pic: File | string): string {
    return pic instanceof File ? URL.createObjectURL(pic) : pic;
  }

  // Methode zum Aktualisieren der Immobilie mit FormData (analog zur addRealEstate-Methode)
  editRealEstate() {
    // Sicherstellen, dass die real_estate_id gesetzt ist (aus der URL)
    const listingId = Number(this.route.snapshot.paramMap.get('id'));
    if (listingId) {
      this.realEstateToEdit.real_estate_id = listingId;
    } else {
      console.error('Keine gültige Listing-ID in der URL gefunden.');
      return;
    }

    // Erstelle ein FormData-Objekt
    const formData = new FormData();
    formData.append('real_estate', JSON.stringify(this.realEstateToEdit));

    // Falls Bilder ausgewählt wurden, hänge sie an das FormData an
    if (this.realEstateToEdit.pictures && this.realEstateToEdit.pictures.length > 0) {
      this.realEstateToEdit.pictures.forEach((file: File) => {
        formData.append('pictures', file, file.name);
      });
    }

    // Sende das FormData an den Service
    this.realEstateService.updateListing(formData).subscribe({
      next: (response) => {
        console.log('Real Estate successfully updated:', response);
      },
      error: (error) => {
        console.error('Error updating real estate:', error);
      }
    });
  }
}
