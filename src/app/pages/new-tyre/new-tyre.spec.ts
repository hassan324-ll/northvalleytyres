import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTyre } from './new-tyre';

describe('NewTyre', () => {
  let component: NewTyre;
  let fixture: ComponentFixture<NewTyre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTyre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTyre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
