import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Curso } from '../../../models/curso';
import { Usuario } from '../../../models/usuario';
import { InscripcioncursoService } from '../../../services/inscripcioncurso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { UsuarioService } from '../../../services/usuario.service';
import { InscripcionCurso } from '../../../models/inscripcionCurso';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditarinscripcioncurso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule 
  ],
  templateUrl: './insertareditarinscripcioncurso.component.html',
  styleUrl: './insertareditarinscripcioncurso.component.css',
})
export class InsertareditarinscripcioncursoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  inscripcionCurso: InscripcionCurso = new InscripcionCurso();
  listaCursos: Curso[] = [];
  listaUsuarios: Usuario[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private icS: InscripcioncursoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cS: CursoService,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private snackBar: MatSnackBar
  ) {}
  noPermitirFechasFuturas = (fecha: Date | null): boolean => {
  if (!fecha) return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const fechaSeleccionada = new Date(fecha);
  fechaSeleccionada.setHours(0, 0, 0, 0);

  return fechaSeleccionada <= hoy;
};

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idInscripcion: [{ value: '', disabled: true }],
      fechaInscripcionCurso: ['', Validators.required],
      progresoInscripcionCurso: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      curso: ['', Validators.required],
      usuario: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.cS.list().subscribe((data) => {
      this.listaCursos = data;
    });
    this.uS.listar().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  aceptar(): void {
    if (this.form.valid) {
    const fechaInscripcion = new Date(this.form.value.fechaInscripcionCurso);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    fechaInscripcion.setHours(0, 0, 0, 0);

    this.form.get('fechaInscripcionCurso')?.setErrors(null);
    let hayError = false;

    // ❌ Validación: no se permite fecha pasada
    if (fechaInscripcion > hoy) {
  this.form.get('fechaInscripcionCurso')?.setErrors({ fechaFutura: true });
  hayError = true;
}

    if (hayError) return;
    if (this.form.valid) {
      this.inscripcionCurso.idInscripcion = this.id;
      this.inscripcionCurso.fechaInscripcionCurso =
        this.form.value.fechaInscripcionCurso;
      this.inscripcionCurso.progresoInscripcionCurso =
        this.form.value.progresoInscripcionCurso;
      this.inscripcionCurso.curso = new Curso();
      this.inscripcionCurso.curso.idCurso = this.form.value.curso;
      this.inscripcionCurso.usuario = new Usuario();
      this.inscripcionCurso.usuario.idUsuario = this.form.value.usuario;
      if (this.edicion) {
        this.icS.update(this.inscripcionCurso).subscribe(() => {
          this.icS.list().subscribe((data) => {
            this.icS.setList(data);
          });
        });
      } else {
        this.icS.insert(this.inscripcionCurso).subscribe(() => {
          this.icS.list().subscribe((data) => {
            this.icS.setList(data);
            this.snackBar.open('¡Curso registrado con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }
      this.router.navigate(['inscripcioncursos']);
    }
  }
  }
  init() {
    if (this.edicion) {
      this.icS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          idInscripcion: data.idInscripcion,
          fechaInscripcionCurso: data.fechaInscripcionCurso,
          progresoInscripcionCurso: data.progresoInscripcionCurso,
          curso: data.curso.idCurso,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
  cancelar() {
    this.snackBar.open('Operación cancelada', 'Cerrar', {
      duration: 3000,
    });
    this.router.navigate(['inscripcioncursos']);
  }
}
