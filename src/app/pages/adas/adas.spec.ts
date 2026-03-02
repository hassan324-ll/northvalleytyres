import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adas } from './adas';

describe('Adas', () => {
  let component: Adas;
  let fixture: ComponentFixture<Adas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
