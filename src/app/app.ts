import { Component } from '@angular/core';
import { GeoSelectorComponent } from './components/geo-selector/geo-selector';

@Component({
  selector: 'app-root',
  template: `<app-geo-selector />`,
  standalone: true,
  imports: [GeoSelectorComponent]
})
export class AppComponent {}