import { Component, type OnInit } from '@angular/core';
import { MapaService } from '../../services/mapa.service';

@Component({
  selector: 'app-mapa',
  imports: [],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css',
})
export class MapaComponent implements OnInit {
  constructor(private mS: MapaService) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      console.log(data);
    });
  }
}
