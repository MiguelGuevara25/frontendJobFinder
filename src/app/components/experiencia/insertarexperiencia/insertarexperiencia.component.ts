import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const fechasValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const inicio = control.get('fechaInicio')?.value;
  const fin = control.get('fechaFin')?.value;

  if (inicio && fin && new Date(fin) < new Date(inicio)) {
    return { fechaFinInvalida: true };
  }

  return null;
};

@Component({
  selector: 'app-insertarexperiencia',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertarexperiencia.component.html',
  styleUrl: './insertarexperiencia.component.css',
})
export class InsertarexperienciaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  experiencia: Experiencia = new Experiencia();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private exS: ExperienciaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // 1. Crear primero el formulario base
    this.form = this.formBuilder.group(
      {
        codigo: [''],
        puesto: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
        ],
        empresa: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
        ],
        fechaInicio: ['', Validators.required],
        fechaFin: ['', Validators.required],
        descripcion: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$')],
        ],
      },
      { validators: fechasValidator }
    );

    // 2. Luego detectar si es edición
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  init() {
    if (this.edicion) {
      this.exS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.id,
          puesto: data.job,
          empresa: data.enterprise,
          fechaInicio: data.startDate,
          fechaFin: data.endDate,
          descripcion: data.description,
        });
        this.form.get('codigo')?.disable();
      });
    }
  }

  aceptar() {
    if (this.form.valid) {
      const raw = this.form.getRawValue(); // lee también campos deshabilitados

      this.experiencia.id = raw.codigo;
      this.experiencia.job = raw.puesto;
      this.experiencia.enterprise = raw.empresa;
      this.experiencia.startDate = raw.fechaInicio;
      this.experiencia.endDate = raw.fechaFin;
      this.experiencia.description = raw.descripcion;

      if (this.edicion) {
        this.exS.update(this.experiencia).subscribe(() => {
          this.exS.list().subscribe((data) => {
            this.exS.setList(data);
            this.snackBar.open('¡Experiencia actualizada con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      } else {
        this.exS.insert(this.experiencia).subscribe(() => {
          this.exS.list().subscribe((data) => {
            this.exS.setList(data);
            this.snackBar.open('¡Experiencia registrada con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }

      this.router.navigate(['/experiencias']);
    } else {
      this.form.markAllAsTouched();
      const controls = ['puesto', 'empresa', 'fechaInicio', 'fechaFin', 'descripcion'];
      controls.forEach((control) => {
        if (this.form.get(control)?.invalid) {
          this.triggerShake(control);
        }
      });
    }
  }

  triggerShake(controlName: string) {
    const field = document.querySelector(`.form-control-${controlName}`);
    if (field) {
      field.classList.remove('shake');
      setTimeout(() => {
        field.classList.add('shake');
      }, 10);
    }
  }

  soloLetras(event: KeyboardEvent) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/;
    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['/experiencias']);
  }
}
