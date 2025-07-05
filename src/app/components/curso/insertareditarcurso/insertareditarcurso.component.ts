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
import { Curso } from '../../../models/curso';
import { Empresa } from '../../../models/empresa';
import { MatSelectModule } from '@angular/material/select';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmpresaService } from '../../../services/empresa.service';

@Component({
  selector: 'app-insertareditarcurso',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './insertareditarcurso.component.html',
  styleUrl: './insertareditarcurso.component.css',
})
export class InsertareditarcursoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  curso: Curso = new Curso();
  listaEmpresas: Empresa[] = [];
  id: number = 0;
  edicion: boolean = false;
  empresa: Empresa = new Empresa();

  constructor(
    private cS: CursoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private eS: EmpresaService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idCurso: [{ value: '', disabled: true }],
      tituloCurso: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      descripcionCurso: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      plataformaCurso: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      linkCurso: [
        '',
        [Validators.required, Validators.pattern(/^www\..+\.com$/)],
      ],
      empresa: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.eS.list().subscribe((data) => {
      this.listaEmpresas = data;
    });
  }

  init(): void {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.curso.idCurso = data.idCurso;
        this.form.patchValue({
          idCurso: data.idCurso,
          tituloCurso: data.tituloCurso,
          descripcionCurso: data.descripcionCurso,
          plataformaCurso: data.plataformaCurso,
          linkCurso: data.linkCurso,

          empresa: data.empresa.id,
        });
      });
    }
  }

  aceptar(): void {
    if (this.form.valid) {
      this.curso.idCurso = this.id;
      this.curso.tituloCurso = this.form.value.tituloCurso;
      this.curso.descripcionCurso = this.form.value.descripcionCurso;
      this.curso.plataformaCurso = this.form.value.plataformaCurso;
      this.curso.linkCurso = this.form.value.linkCurso;
      this.curso.empresa = new Empresa();
      this.curso.empresa.id = this.form.value.empresa;
      console.log(this.edicion);
      if (this.edicion) {
        this.cS.update(this.curso).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('¡Curso actualizado con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      } else {
        this.cS.insert(this.curso).subscribe(() => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.snackBar.open('¡Curso registrado con éxito!', 'Cerrar', {
              duration: 3000,
            });
          });
        });
      }
      this.router.navigate(['cursos']);
    }
  }

  cancelar(): void {
    this.router.navigate(['cursos']);
  }
}
