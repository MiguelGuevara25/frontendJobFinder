import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RolService } from '../../../services/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from '../../../models/rol';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarol',
  imports: [MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './insertareditarol.component.html',
  styleUrl: './insertareditarol.component.css'
})
export class InsertareditarolComponent {
  form: FormGroup = new FormGroup({});
  rol: Rol = new Rol();
  id: number = 0;
  edicion: boolean = false;

  listaUsuario: Usuario[] = []

  constructor(
    private rS: RolService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private uS: UsuarioService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
    });

    this.uS.listar().subscribe(data => {
      this.listaUsuario = data
    })
  }
  aceptar() {
    if (this.form.valid) {
      this.rol.id = this.form.value.id
      this.rol.rol = this.form.value.nombre
      this.rol.user = this.form.value.usuario

      if (this.edicion) {
        this.rS.update(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });

      } else {
        this.rS.registrar(this.rol).subscribe(() => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
      this.router.navigate(['rol']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.rol),
          apellido: new FormControl(data.user),

        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['rol']);
  }
}

