import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterModule, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Korrektur bei styleUrls
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule ], // Importiere hier die beiden Module
})
export class AppComponent {
  title = 'real-estate-section';
}
