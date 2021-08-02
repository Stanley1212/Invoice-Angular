import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccionListComponent } from './produccion-list.component';

describe('ProduccionListComponent', () => {
  let component: ProduccionListComponent;
  let fixture: ComponentFixture<ProduccionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
