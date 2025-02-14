import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {provideRouter} from '@angular/router';
import {routes} from './app/routes/real-estate-routing.module';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [provideRouter(routes)]
}
  )
  .catch((err) => console.error(err));
