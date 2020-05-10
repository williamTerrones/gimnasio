import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarPrecioComponent } from './seleccionar-precio.component';

describe('SeleccionarPrecioComponent', () => {
  let component: SeleccionarPrecioComponent;
  let fixture: ComponentFixture<SeleccionarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
