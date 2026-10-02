import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSelector } from './geo-selector';

describe('GeoSelector', () => {
  let component: GeoSelector;
  let fixture: ComponentFixture<GeoSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(GeoSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
