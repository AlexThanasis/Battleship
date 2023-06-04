import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipPlacingComponent } from './ship-placing.component';

describe('ShipPlacingComponent', () => {
  let component: ShipPlacingComponent;
  let fixture: ComponentFixture<ShipPlacingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipPlacingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShipPlacingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
