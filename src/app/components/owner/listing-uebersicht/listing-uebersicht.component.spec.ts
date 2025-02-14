import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingUebersichtComponent } from './listing-uebersicht.component';

describe('ListingUebersichtComponent', () => {
  let component: ListingUebersichtComponent;
  let fixture: ComponentFixture<ListingUebersichtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingUebersichtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingUebersichtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
