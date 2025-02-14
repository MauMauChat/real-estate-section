import { Component } from '@angular/core';

@Component({
  selector: 'app-detailed-view',
  templateUrl: './detailed-view.component.html',
  styleUrls: ['./detailed-view.component.scss'],
  standalone: true
})
export class DetailedViewComponent {
  propertyDetails = {
    title: 'Schöne Wohnung',
    description: 'Eine wunderbare Wohnung in guter Lage.',
    price: 500
  };

  requestDetails() {
    console.log('Requesting more details for:', this.propertyDetails.title);
  }
}
