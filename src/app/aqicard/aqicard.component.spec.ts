import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AqicardComponent } from './aqicard.component';

describe('AqicardComponent', () => {
  let component: AqicardComponent;
  let fixture: ComponentFixture<AqicardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AqicardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AqicardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
