import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Region {
  id: number;
  numero: string;
  nombre: string;
  capital: string;
}

export interface Comuna {
  id: number;
  nombre: string;
  codigoCut: string;
}

@Injectable({ providedIn: 'root' })
export class GeoService {
  private http = inject(HttpClient);
  private baseUrl = 'https://serv-geo-cl-api.onrender.com/api/v1';

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/regiones`);
  }

  getComunasPorRegion(regionId: number): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(`${this.baseUrl}/regiones/${regionId}/comunas`);
  }
}