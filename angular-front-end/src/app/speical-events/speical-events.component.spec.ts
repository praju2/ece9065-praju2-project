import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeicalEventsComponent } from './speical-events.component';

describe('SpeicalEventsComponent', () => {
  let component: SpeicalEventsComponent;
  let fixture: ComponentFixture<SpeicalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeicalEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeicalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
