import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-real-estate',
  templateUrl: './delete-real-estate.component.html',
  styleUrls: ['./delete-real-estate.component.scss'],
  standalone: true
})
export class DeleteRealEstateComponent {
  realEstateToDelete = {
    title: 'Beispiel Immobilie',
    description: 'Beschreibung der Immobilie',
    price: 1000
  };

  deleteRealEstate() {
    console.log('Real Estate Deleted:', this.realEstateToDelete);
  }
}
