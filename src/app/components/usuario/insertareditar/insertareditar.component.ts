import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../../models/usuario';
import { MatRadioModule } from '@angular/material/radio';
import { UsuarioService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-insertareditar',
  imports: [MatFormFieldModule, MatInputModule, MatRadioModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  estado_u: boolean = true; // Valor por defecto para el estado
  estado_u1: boolean = true; // Valor por defecto para el estado de favorito
  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      direccion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      usuario: ['', [Validators.required,Validators.minLength(3)]],
      contraseña: ['', [Validators.required]],
      favorito: ['', [Validators.required]],
      edad: ['', [Validators.required, Validators.pattern(/^[0-9]+$/),Validators.min(1),Validators.max(100)]],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.usuario.idUsuario = this.form.value.codigo
      this.usuario.nombreUsuario = this.form.value.nombre
      this.usuario.apellidoUsuario = this.form.value.apellido
      this.usuario.correoUsuario = this.form.value.correo
      this.usuario.telefonoUsuario = this.form.value.telefono
      this.usuario.direccionUsuario = this.form.value.direccion
      this.usuario.estadoUsuario = this.form.value.estado
      this.usuario.usuarioUsuario = this.form.value.usuario
      this.usuario.contraseniaUsuario = this.form.value.contraseña
      this.usuario.favoritoUsuario = this.form.value.favorito
      this.usuario.edadUsuario = this.form.value.edad

      this.uS.registrar(this.usuario).subscribe(() => {
        this.uS.listar().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['usuarios']);

    }
  }
}
