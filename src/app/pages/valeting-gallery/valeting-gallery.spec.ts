import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValetingGallery } from './valeting-gallery';

describe('ValetingGallery', () => {
  let component: ValetingGallery;
  let fixture: ComponentFixture<ValetingGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValetingGallery]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValetingGallery);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
