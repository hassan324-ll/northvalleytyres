import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tyres } from './tyres';

describe('Tyres', () => {
  let component: Tyres;
  let fixture: ComponentFixture<Tyres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tyres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tyres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
