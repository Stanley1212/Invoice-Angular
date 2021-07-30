import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasCreateComponent } from './ventas-create.component';

describe('VentasCreateComponent', () => {
  let component: VentasCreateComponent;
  let fixture: ComponentFixture<VentasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
