import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSuplidorComponent } from './crear-suplidor.component';

describe('CrearSuplidorComponent', () => {
  let component: CrearSuplidorComponent;
  let fixture: ComponentFixture<CrearSuplidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSuplidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSuplidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
