import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ofertadetrabajo } from '../../../models/ofertadetrabajo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmpresaService } from '../../../services/empresa.service';
import { MatSelectModule } from '@angular/material/select';
import { Empresa } from '../../../models/empresa';

@Component({
  selector: 'app-insertareditarofertadetrabajo',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './insertareditarofertadetrabajo.component.html',
  styleUrl: './insertareditarofertadetrabajo.component.css',
  providers: [provideNativeDateAdapter()],
})
export class InsertareditarofertadetrabajoComponent {
  form: FormGroup = new FormGroup({});
  ofertaTrabajo: Ofertadetrabajo = new Ofertadetrabajo();
  listEmpresa: Empresa[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private oS: OfertadetrabajoService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private eS: EmpresaService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.FormBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      salary: ['', Validators.required],
      typeofcontract: ['', Validators.required],
      experience: ['', Validators.required],
      location: ['', Validators.required],
      empresa: ['', Validators.required],
    });

    this.eS.list().subscribe((data) => {
      console.log(data);
      this.listEmpresa = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.ofertaTrabajo.id = this.form.value.id;
      this.ofertaTrabajo.name = this.form.value.name;
      this.ofertaTrabajo.description = this.form.value.description;
      this.ofertaTrabajo.salary = this.form.value.salary;
      this.ofertaTrabajo.typeofcontract = this.form.value.typeofcontract;
      this.ofertaTrabajo.experience = this.form.value.experience;
      this.ofertaTrabajo.location = this.form.value.location;
      this.ofertaTrabajo.empresa.id = this.form.value.empresa;

      if (this.edicion) {
        this.oS.update(this.ofertaTrabajo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      } else {
        this.oS.insert(this.ofertaTrabajo).subscribe(() => {
          this.oS.list().subscribe((data) => {
            this.oS.setList(data);
          });
        });
      }
      this.router.navigate(['ofertadetrabajo']);
    }
  }
  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          name: new FormControl(data.name),
          salary: new FormControl(data.salary),
          typeofcontract: new FormControl(data.typeofcontract),
          experience: new FormControl(data.experience),
          location: new FormControl(data.location),
        });
      });
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/ofertadetrabajo']);
  }
}
