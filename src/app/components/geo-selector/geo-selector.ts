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
  regionSeleccionada = signal<number | null>(null);
  cargandoComunas = signal<boolean>(false);

  ngOnInit() {
    this.geoService.getRegiones().subscribe({
      next: (data) => this.regiones.set(data),
      error: (err) => console.error('Error cargando regiones', err)
    });
  }

  onRegionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const regionId = value ? Number(value) : null;
    this.regionSeleccionada.set(regionId);
    this.comunas.set([]);

    if (regionId === null) return;

    this.cargandoComunas.set(true);
    this.geoService.getComunasPorRegion(regionId).subscribe({
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