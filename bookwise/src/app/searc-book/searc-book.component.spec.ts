import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearcBookComponent } from './searc-book.component';

describe('SearcBookComponent', () => {
  let component: SearcBookComponent;
  let fixture: ComponentFixture<SearcBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearcBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearcBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
