import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { GeoService } from './geo';

describe('GeoService', () => {
  const baseUrl = 'https://serv-geo-cl-api.onrender.com/api/v1';
  let service: GeoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GeoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getRegiones consulta /regiones', () => {
    service.getRegiones().subscribe();
    httpMock.expectOne(`${baseUrl}/regiones`).flush([]);
  });

  it('getComunasPorRegion consulta /regiones/{id}/comunas', () => {
    service.getComunasPorRegion(11).subscribe();
    httpMock.expectOne(`${baseUrl}/regiones/11/comunas`).flush([]);
  });
});
