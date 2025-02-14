import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search-browser',
  templateUrl: './search-browser.component.html',
  styleUrls: ['./search-browser.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class SearchBrowserComponent {
  searchQuery = '';

  performSearch() {
    console.log('Search performed:', this.searchQuery);
  }
}
