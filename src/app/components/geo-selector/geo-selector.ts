import { Component, inject, signal, OnInit } from '@angular/core';
import { GeoService, Region, Comuna } from '../../services/geo';

@Component({
  selector: 'app-geo-selector',
  templateUrl: './geo-selector.html',
  standalone: true
})
export class GeoSelectorComponent implements OnInit {
  private geoService = inject(GeoService);

  regiones = signal<Region[]>([]);
  comunas = signal<Comuna[]>([]);
  regionSeleccionada = signal<string>('');
  cargandoComunas = signal<boolean>(false);

  ngOnInit() {
    this.geoService.getRegiones().subscribe({
      next: (data) => this.regiones.set(data),
      error: (err) => console.error('Error cargando regiones', err)
    });
  }

  onRegionChange(event: Event) {
    const nombre = (event.target as HTMLSelectElement).value;
    this.regionSeleccionada.set(nombre);
    this.comunas.set([]);

    if (!nombre) return;

    this.cargandoComunas.set(true);
    this.geoService.getComunasPorRegion(nombre).subscribe({
      next: (data) => {
        this.comunas.set(data);
        this.cargandoComunas.set(false);
      },
      error: (err) => {
        console.error('Error cargando comunas', err);
        this.cargandoComunas.set(false);
      }
    });
  }
}