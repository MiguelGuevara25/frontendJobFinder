import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
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

@Component({
  selector: 'app-insertareditarinscripcioncurso',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule],
  templateUrl: './insertareditarinscripcioncurso.component.html',
  styleUrl: './insertareditarinscripcioncurso.component.css'
})
export class InsertareditarinscripcioncursoComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  inscripcionCurso: InscripcionCurso = new InscripcionCurso();
  listaCursos: Curso[]=[];
  listaUsuarios: Usuario[]=[]
  id: number = 0;
  edicion: boolean = false;

constructor(
    private icS: InscripcioncursoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private cS: CursoService,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      idInscripcion: [''],
      fechaInscripcionCurso: ['', Validators.required],
      progresoInscripcionCurso: ['', Validators.required],
      curso: ['', Validators.required],
      usuario: ['', Validators.required],
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
      this.inscripcionCurso.idInscripcion = this.form.value.idInscripcion;
      this.inscripcionCurso.fechaInscripcionCurso = this.form.value.fechaInscripcionCurso;
      this.inscripcionCurso.progresoInscripcionCurso = this.form.value.progresoInscripcionCurso;
      this.inscripcionCurso.curso.idCurso = this.form.value.curso;
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
          });
        });
      }
      this.router.navigate(['inscripcioncursos']);
    }
  }
  init() {
    if (this.edicion) {
      this.icS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          idInscripcion: new FormControl(data.idInscripcion),
          fechaInscripcionCurso: new FormControl(data.fechaInscripcionCurso),
          progresoInscripcionCurso: new FormControl(data.progresoInscripcionCurso),
          curso: new FormControl(data.curso.idCurso),
          usuario: new FormControl(data.usuario.idUsuario),
        });
      });
    }
  }
  cancelar(){
    this.router.navigate(['inscripcioncursos']);
  }
}
