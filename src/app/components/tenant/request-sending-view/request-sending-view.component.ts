import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-request-sending-view',
  templateUrl: './request-sending-view.component.html',
  styleUrls: ['./request-sending-view.component.scss'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class RequestSendingViewComponent {
  requestData = { message: '' };

  sendRequest() {
    console.log('Request sent:', this.requestData);
  }
}
