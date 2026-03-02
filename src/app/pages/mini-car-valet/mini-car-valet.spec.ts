import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCarValet } from './mini-car-valet';

describe('MiniCarValet', () => {
  let component: MiniCarValet;
  let fixture: ComponentFixture<MiniCarValet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniCarValet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCarValet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
