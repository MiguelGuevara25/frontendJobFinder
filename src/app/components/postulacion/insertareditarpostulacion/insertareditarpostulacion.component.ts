import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Postulacion } from '../../../models/postulacion';
import { PostulacionService } from '../../../services/postulacion.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ofertadetrabajo } from '../../../models/ofertadetrabajo';
import { OfertadetrabajoService } from '../../../services/ofertadetrabajo.service';

interface Estado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-insertareditarpostulacion',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertareditarpostulacion.component.html',
  styleUrl: './insertareditarpostulacion.component.css',
})
export class InsertareditarpostulacionComponent {
  form: FormGroup = new FormGroup({});
  postulacion: Postulacion = new Postulacion();
  estados: Estado[] = [
    {
      value: 'ACEPTADA',
      viewValue: 'Aceptada',
    },

    {
      value: 'PENDIENTE',
      viewValue: 'Pendiente',
    },

    {
      value: 'RECHAZADA',
      viewValue: 'Rechazada',
    },
  ];
  listOfertaTrabajo: Ofertadetrabajo[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: PostulacionService,
    private oS: OfertadetrabajoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      date: ['', [Validators.required]],
      acceptedcandidate: [false, [Validators.required]],
      state: ['', [Validators.required]],
      ofertaTrabajo: ['', [Validators.required]],
    });

    this.oS.list().subscribe((data) => {
      this.listOfertaTrabajo = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.postulacion.id = this.form.value.id;
      this.postulacion.date = this.form.value.date;
      this.postulacion.acceptedcandidate = this.form.value.acceptedcandidate;
      this.postulacion.state = this.form.value.state;
      this.postulacion.ofertaTrabajo.id = this.form.value.ofertaTrabajo;

      if (this.edicion) {
        this.pS.update(this.postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
            this.snackBar.open(
              '¡Postulación actualizada con éxito!',
              'Cerrar',
              {
                duration: 3000,
              }
            );
          });
        });
      } else {
        this.pS.insert(this.postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
            this.snackBar.open('¡Postulación registrada con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }

      this.router.navigate(['/postulacion']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          date: new FormControl(data.date),
          acceptedcandidate: new FormControl(data.acceptedcandidate),
          state: new FormControl(data.state),
          ofertaTrabajo: new FormControl(data.ofertaTrabajo.id),
        });
      });
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/postulacion']);
  }
}
