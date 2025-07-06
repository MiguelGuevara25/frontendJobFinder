import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Curriculum } from '../../../models/curriculum';
import { CurriculumService } from '../../../services/curriculum.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Usuario } from '../../../models/usuario';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditarcurriculum',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './insertareditarcurriculum.component.html',
  styleUrl: './insertareditarcurriculum.component.css'
})
export class InsertareditarcurriculumComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  curriculum: Curriculum = new Curriculum();
  id: number = 0;
  edicion: boolean = false;

  listausuario: Usuario[] = []

  constructor(
    private cS: CurriculumService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    

    this.form = this.formBuilder.group({
      codigo: [{ value: '', disabled: true }],
      descripcion: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.uS.listar().subscribe(data => {
      this.listausuario = data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.curriculum.idCurriculum = this.id
      this.curriculum.descripcionCurriculum = this.form.value.descripcion
      this.curriculum.fechaCurriculum = this.form.value.fechaCreacion
      this.curriculum.usuario = { idUsuario: this.form.value.usuario } as Usuario;
      console.log(this.edicion)
      if (this.edicion) {
        this.cS.update(this.curriculum).subscribe(() => {
          this.cS.listar().subscribe((data) => {
            this.cS.setList(data);
            this._snackBar.open("¡Curriculum actualizado con éxito!", "Cerrar", {
              duration: 3000,
            });
          });
        });

      } else {
        this.cS.insertar(this.curriculum).subscribe(() => {
          this.cS.listar().subscribe((data) => {
            this.cS.setList(data);
            this._snackBar.open("¡Curriculum registrado con éxito!", "Cerrar", {
              duration: 3000,
            });
          });
        });
      }
      this.router.navigate(['curriculum']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listarId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idCurriculum,
          descripcion:data.descripcionCurriculum,
          fechaCreacion: data.fechaCurriculum,
          usuario: data.usuario.idUsuario,
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['curriculum']);
  }
}
