import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSendingViewComponent } from './request-sending-view.component';

describe('RequestSendingViewComponent', () => {
  let component: RequestSendingViewComponent;
  let fixture: ComponentFixture<RequestSendingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestSendingViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestSendingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
