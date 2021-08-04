import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasViewComponent } from './compras-view.component';

describe('ComprasViewComponent', () => {
  let component: ComprasViewComponent;
  let fixture: ComponentFixture<ComprasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
