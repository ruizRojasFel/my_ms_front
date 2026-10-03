import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { GeoSelectorComponent } from './geo-selector';

describe('GeoSelectorComponent', () => {
  const baseUrl = 'https://serv-geo-cl-api.onrender.com/api/v1';
  let component: GeoSelectorComponent;
  let fixture: ComponentFixture<GeoSelectorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeoSelectorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(GeoSelectorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();

    httpMock.expectOne(`${baseUrl}/regiones`).flush([
      { id: 11, numero: 'VIII', nombre: 'Biobío', capital: 'Concepción' },
    ]);
  });

  afterEach(() => httpMock.verify());

  it('carga las regiones al iniciar', () => {
    expect(component.regiones()).toHaveLength(1);
  });

  it('al seleccionar una región carga sus comunas por id', () => {
    const select = { value: '11' } as HTMLSelectElement;
    component.onRegionChange({ target: select } as unknown as Event);

    expect(component.regionSeleccionada()).toBe(11);
    httpMock.expectOne(`${baseUrl}/regiones/11/comunas`).flush([
      { id: 219, nombre: 'Concepción', codigoCut: '08101' },
    ]);
    expect(component.comunas()).toHaveLength(1);
    expect(component.cargandoComunas()).toBe(false);
  });

  it('al limpiar la selección no consulta comunas', () => {
    component.onRegionChange({ target: { value: '' } } as unknown as Event);

    expect(component.regionSeleccionada()).toBeNull();
    expect(component.comunas()).toEqual([]);
  });
});
