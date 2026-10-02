import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Region {
  nombre: string;
}

export interface Comuna {
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class GeoService {
  private http = inject(HttpClient);
  private baseUrl = 'https://api-geo-cl-3qbd.onrender.com/api/v1';

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.baseUrl}/regiones`);
  }

  getComunasPorRegion(nombre: string): Observable<Comuna[]> {
    return this.http.get<Comuna[]>(`${this.baseUrl}/regiones/comunas`, {
      params: { nombre }
    });
  }
}