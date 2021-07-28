import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearUnidadComponent } from './crear-unidad.component';

describe('CrearUnidadComponent', () => {
  let component: CrearUnidadComponent;
  let fixture: ComponentFixture<CrearUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearUnidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
