import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheeAligmentBalancing } from './whee-aligment-balancing';

describe('WheeAligmentBalancing', () => {
  let component: WheeAligmentBalancing;
  let fixture: ComponentFixture<WheeAligmentBalancing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheeAligmentBalancing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheeAligmentBalancing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
