import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealEstateService } from '../../../services/real-estate.service';
import { CommonModule } from '@angular/common';
import { RealEstate } from '../../../models/real-estate.model';
import { categories, types, cities, provinces } from '../../../data/data';

@Component({
  selector: 'app-add-real-estate',
  templateUrl: './add-real-estate.component.html',
  styleUrls: ['./add-real-estate.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
  ],
  standalone: true
})
export class AddRealEstateComponent {
  // Dieses Objekt wird für die File-Uploads (über createPictureArray) genutzt
  newRealEstate: RealEstate = {} as RealEstate;



  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;

  constructor(private realEstateService: RealEstateService) {}

  // Diese Methode erstellt ein FormData-Objekt, in dem das Immobilienobjekt (als JSON)
  // und die Bilder (als File-Objekte) enthalten sind.
  addRealEstate() {
    if (!this.newRealEstate.type_attributes) {
      this.newRealEstate.type_attributes = {};
    }

    const formData = new FormData();

    // Hier kannst du entweder defaultRealEstate oder ein zusammengeführtes Objekt verwenden.
    // In diesem Beispiel senden wir defaultRealEstate, da es alle nötigen Felder enthält.
    formData.append('real_estate', JSON.stringify(this.newRealEstate));

    // Falls über die Bild-Auswahl (createPictureArray) Dateien ausgewählt wurden,
    // hänge sie an das FormData an.
    if (this.newRealEstate.pictures && this.newRealEstate.pictures.length > 0) {
      this.newRealEstate.pictures.forEach((file: File) => {
        formData.append('pictures', file, file.name);
      });
    }

    // Sende das FormData an den Service
    this.realEstateService.createListing(formData).subscribe({
      next: (response) => {
        console.log('Listing successfully created:', response);
        // Hier kannst du den Nutzer benachrichtigen oder die Seite weiterleiten
      },
      error: (err) => {
        console.error('Error creating listing*(troubel):', err);
        // Hier kannst du eine Fehlerbehandlung einbauen
      }
    });
  }

  // Diese Methode wandelt die ausgewählten Dateien in ein Array um, das dann in newRealEstate gespeichert wird.
  createPictureArray(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newRealEstate.pictures = Array.from(fileList);
    }
  }
}
