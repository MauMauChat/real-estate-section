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
  newRealEstate: RealEstate = {} as RealEstate;

  categories = categories;
  types = types;
  cities = cities;
  provinces = provinces;

  constructor(private realEstateService: RealEstateService) {}

  addRealEstate() {
    if (!this.newRealEstate.type_attributes) {
      this.newRealEstate.type_attributes = {};
    }

    const formData = new FormData();
    formData.append('real_estate', JSON.stringify(this.newRealEstate));

    if (this.newRealEstate.pictures && this.newRealEstate.pictures.length > 0) {
      this.newRealEstate.pictures.forEach((file: File) => {
        formData.append('pictures', file, file.name);
      });
    }

    this.realEstateService.createListing(formData).subscribe({
      next: (response) => {
        console.log('Listing successfully created:', response);
      },
      error: (err) => {
        console.error('Error creating listing:', err);
      }
    });
  }

  createPictureArray(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.newRealEstate.pictures = Array.from(fileList);
    }
  }

  // Hilfsmethode für die Bildvorschau
  getPictureUrl(pic: File | string): string {
    return pic instanceof File ? URL.createObjectURL(pic) : pic;
  }
}
