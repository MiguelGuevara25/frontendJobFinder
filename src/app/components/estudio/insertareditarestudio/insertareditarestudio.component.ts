import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Estudio } from '../../../models/estudio';
import { EstudioService } from '../../../services/estudio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

const fechasValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: any } | null => {
  const inicio = control.get('fecha_inicio')?.value;
  const fin = control.get('fecha_fin')?.value;

  if (inicio && fin && new Date(fin) < new Date(inicio)) {
    return { fechaFinInvalida: true };
  }

  return null;
};

@Component({
  selector: 'app-insertareditarestudio',
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
  templateUrl: './insertareditarestudio.component.html',
  styleUrl: './insertareditarestudio.component.css',
})
export class InsertareditarestudioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  estudio: Estudio = new Estudio();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EstudioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Primero crea el formulario
    this.form = this.formBuilder.group(
      {
        codigo: [''],
        titulo: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'),
          ],
        ],
        centro: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+$'),
          ],
        ],
        fecha_inicio: ['', Validators.required],
        fecha_fin: ['', Validators.required],
      },
      { validators: fechasValidator }
    );

    // Luego analiza si es edición y carga los datos
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar() {
    if (this.form.valid) {
      const formValues = this.form.getRawValue(); // para incluir campos deshabilitados

      this.estudio.id = formValues.codigo;
      this.estudio.title_obtained = formValues.titulo;
      this.estudio.study_center = formValues.centro;
      this.estudio.start_date = formValues.fecha_inicio;
      this.estudio.end_date = formValues.fecha_fin;

      if (this.edicion) {
        this.eS.update(this.estudio).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
            this.snackBar.open('¡Estudio actualizado con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      } else {
        this.eS.insert(this.estudio).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
            this.snackBar.open('¡Estudio registrado con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }

      this.router.navigate(['/estudios']);
    } else {
      this.form.markAllAsTouched();
      const controls = ['titulo', 'centro', 'fecha_inicio', 'fecha_fin'];
      controls.forEach((control) => {
        if (this.form.get(control)?.invalid) {
          this.triggerShake(control);
        }
      });
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.id,
          titulo: data.title_obtained,
          centro: data.study_center,
          fecha_inicio: data.start_date,
          fecha_fin: data.end_date,
        });
        this.form.get('codigo')?.disable(); // deshabilitar después del patchValue
      });
    }
  }

  triggerShake(controlName: string) {
    const field = document.querySelector(`.form-control-${controlName}`);
    if (field) {
      field.classList.remove('shake');

      // Espera a que se quite la clase antes de volver a aplicarla
      setTimeout(() => {
        field.classList.add('shake');
      }, 10); // Tiempo muy corto, suficiente para reiniciar animación
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
    this.router.navigate(['/estudios']);
  }
}
