import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Ofertadetrabajo } from '../ofertadetrabajo.component';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insertareditarofertadetrabajo',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,

  ],
  templateUrl: './insertareditarofertadetrabajo.component.html',
  styleUrl: './insertareditarofertadetrabajo.component.css'
})
export class InsertareditarofertadetrabajoComponent {
form: FormGroup = new FormGroup({});
Ofertadetrabajo: Ofertadetrabajo = new Ofertadetrabajo();

id: number = 0;
edicion: boolean = false;

  constructor(
    private oS: OfertadetrabajoService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
