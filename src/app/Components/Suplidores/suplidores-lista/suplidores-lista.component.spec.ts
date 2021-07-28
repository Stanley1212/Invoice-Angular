import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplidoresListaComponent } from './suplidores-lista.component';

describe('SuplidoresListaComponent', () => {
  let component: SuplidoresListaComponent;
  let fixture: ComponentFixture<SuplidoresListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplidoresListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplidoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
