import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBrowserComponent } from './filter-browser.component';

describe('FilterBrowserComponent', () => {
  let component: FilterBrowserComponent;
  let fixture: ComponentFixture<FilterBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
