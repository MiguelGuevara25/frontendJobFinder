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

@Component({
  selector: 'app-insertar-editar-entrevista',
  imports: [
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
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

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private eS: EntrevistaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      idEntrevista: [''],
      date: ['', Validators.required],
      hour: ['', Validators.required],
      modality: ['', Validators.required],
      result: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.entrevista.id = this.form.value.idEntrevista;
      this.entrevista.date = this.form.value.date;
      this.entrevista.hour = this.form.value.hour;
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
          idEntrevista: new FormControl(data.id),
          date: new FormControl(data.date),
          hour: new FormControl(data.hour),
          modality: new FormControl(data.modality),
          result: new FormControl(data.result),
        });
      });
    }
  }
}
