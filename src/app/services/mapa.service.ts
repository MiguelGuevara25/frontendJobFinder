import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  private url =
    'https://nominatim.openstreetmap.org/search?format=json&countrycodes=pe&q=';

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(
      `${this.url}${encodeURIComponent(
        'Calle Schell 452, Miraflores, Lima, Perú'
      )}`
    );
  }
}
