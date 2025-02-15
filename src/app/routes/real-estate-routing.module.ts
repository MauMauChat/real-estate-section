import { Routes, RouterModule } from '@angular/router';
import { ListingUebersichtComponent } from '../components/owner/listing-uebersicht/listing-uebersicht.component';
import { AddRealEstateComponent } from '../components/owner/add-real-estate/add-real-estate.component';
import { EditRealEstateComponent } from '../components/owner/edit-real-estate/edit-real-estate.component';
import { DeleteRealEstateComponent } from '../components/owner/delete-real-estate/delete-real-estate.component';
import { RequestUebersichtComponent } from '../components/owner/request-uebersicht/request-uebersicht.component';
import { SearchBrowserComponent } from '../components/tenant/search-browser/search-browser.component';
import { FilterBrowserComponent } from '../components/tenant/filter-browser/filter-browser.component';
import { DetailedViewComponent } from '../components/tenant/detailed-view/detailed-view.component';

export const routes: Routes = [
  { path: 'owner/listings', component: ListingUebersichtComponent },
  { path: 'owner/add', component: AddRealEstateComponent },
  { path: 'owner/edit/:id', component: EditRealEstateComponent },
  { path: 'owner/delete/:id', component: DeleteRealEstateComponent },
  { path: 'owner/requests', component: RequestUebersichtComponent },
  { path: 'tenant/search', component: SearchBrowserComponent },
  { path: 'tenant/filter', component: FilterBrowserComponent },
  { path: 'tenant/details/:id', component: DetailedViewComponent },
  { path: '', redirectTo: '/tenant/search', pathMatch: 'full' }
];

RouterModule.forRoot(routes);
export class RealEstateRoutingModule { }
