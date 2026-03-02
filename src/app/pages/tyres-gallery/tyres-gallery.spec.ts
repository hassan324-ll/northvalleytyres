import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyresGallery } from './tyres-gallery';

describe('TyresGallery', () => {
  let component: TyresGallery;
  let fixture: ComponentFixture<TyresGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TyresGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TyresGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
