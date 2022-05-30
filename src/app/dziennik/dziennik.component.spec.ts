import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dziennikComponent } from './dziennik.component';

describe('dziennikComponent', () => {
  let component: dziennikComponent;
  let fixture: ComponentFixture<dziennikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ dziennikComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(dziennikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
