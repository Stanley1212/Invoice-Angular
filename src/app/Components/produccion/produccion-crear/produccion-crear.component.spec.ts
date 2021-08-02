import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionCrearComponent } from './produccion-crear.component';

describe('ProduccionCrearComponent', () => {
  let component: ProduccionCrearComponent;
  let fixture: ComponentFixture<ProduccionCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionCrearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
