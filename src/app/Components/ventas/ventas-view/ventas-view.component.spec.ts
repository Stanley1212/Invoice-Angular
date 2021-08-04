import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasViewComponent } from './ventas-view.component';

describe('VentasViewComponent', () => {
  let component: VentasViewComponent;
  let fixture: ComponentFixture<VentasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
