import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMatch } from './price-match';

describe('PriceMatch', () => {
  let component: PriceMatch;
  let fixture: ComponentFixture<PriceMatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceMatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMatch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
