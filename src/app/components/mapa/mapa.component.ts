import { ChangeDetectorRef, Component, type OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { Empresa } from '../../models/empresa';

interface GeocodingResponse {
  results: Array<{
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
  }>;
  status: string;
}

@Component({
  selector: 'app-mapa',
  imports: [GoogleMapsModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  zoom = 12;
  empresas: Empresa[] = [];

  constructor(
    private empresaService: EmpresaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.empresaService.list().subscribe((empresas) => {
      this.empresas = empresas; // Guarda las empresas con direcciones
    });
  }

  onSelectDireccion(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Tipo de assertion
    const direccion = selectElement.value;

    this.empresaService
      .obtenerCoordenadas(direccion)
      .subscribe((response: GeocodingResponse) => {
        if (response.status === 'OK' && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          this.center = { lat: location.lat, lng: location.lng };
          this.cdr.detectChanges(); // Forzar la actualización del mapa
        }
      });
  }
}
