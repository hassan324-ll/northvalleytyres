import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileFitting } from './mobile-fitting';

describe('MobileFitting', () => {
  let component: MobileFitting;
  let fixture: ComponentFixture<MobileFitting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileFitting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileFitting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
