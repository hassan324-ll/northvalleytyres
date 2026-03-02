import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCarValet } from './full-car-valet';

describe('FullCarValet', () => {
  let component: FullCarValet;
  let fixture: ComponentFixture<FullCarValet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullCarValet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullCarValet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
