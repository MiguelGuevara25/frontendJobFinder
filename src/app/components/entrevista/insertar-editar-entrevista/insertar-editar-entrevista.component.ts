import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { Entrevista } from '../../../models/entrevista';
import { EntrevistaService } from '../../../services/entrevista.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { Postulacion } from '../../../models/postulacion';
import { PostulacionService } from '../../../services/postulacion.service';

@Component({
  selector: 'app-insertar-editar-entrevista',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatButton,
  ],
  templateUrl: './insertar-editar-entrevista.component.html',
  styleUrl: './insertar-editar-entrevista.component.css',
})
export class InsertarEditarEntrevistaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  entrevista: Entrevista = new Entrevista();
  listUsuario: Usuario[] = [];
  listPostulacion: Postulacion[] = [];

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private pS: PostulacionService,
    private eS: EntrevistaService,
    private route: ActivatedRoute,
    private uS: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [''],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      postulacion: ['', Validators.required],
      usuario: ['', Validators.required],
      modality: ['', Validators.required],
      result: ['', Validators.required],
    });

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.pS.list().subscribe((data) => {
      this.listPostulacion = data;
    });

    this.uS.listar().subscribe((data) => {
      this.listUsuario = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      console.log(Object.values(this.form.value));

      this.entrevista.id = this.form.value.id;
      this.entrevista.date = this.form.value.date;
      const horaDate: Date = this.form.value.hour;
      const horaString = horaDate.toTimeString().split(' ')[0]; // convierte a "HH:mm:ss"
      this.entrevista.hour = horaString;
      this.entrevista.modality = this.form.value.modality;
      this.entrevista.result = this.form.value.result;

      if (this.edicion) {
        this.eS.update(this.entrevista).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.entrevista).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['entrevista']);
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          date: new FormControl(data.date),
          hour: new FormControl(data.hour),
          modality: new FormControl(data.modality),
          result: new FormControl(data.result),
        });
      });
    }
  }
}
