import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Valeting } from './valeting';

describe('Valeting', () => {
  let component: Valeting;
  let fixture: ComponentFixture<Valeting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Valeting]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Valeting);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
