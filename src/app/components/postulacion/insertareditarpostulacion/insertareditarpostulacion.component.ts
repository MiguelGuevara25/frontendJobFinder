import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Postulacion } from '../postulacion';
import { Postulacion } from '../../../models/postulacion';
import { PostulacionService } from '../../../services/postulacion.service';
import { Router } from 'express';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-insertareditarpostulacion',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,],
  templateUrl: './insertareditarpostulacion.component.html',
  styleUrl: './insertareditarpostulacion.component.css'
})
export class InsertareditarpostulacionComponent {
  form: FormGroup = new FormGroup({});
Postulacion: Postulacion = new Postulacion();


id: number = 0;
edicion: boolean = false;

  constructor(
    private pS: PostulacionService,
    private FormBuilder: FormBuilder,
    private Router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

  this.form = this.FormBuilder.group({
  id:[''],
  date:['', Validators.required],
  state:['', Validators.required],
  acceptedcandidate: ['', Validators.required],
  });
}

  aceptar() {
    if (this.form.valid) {
      this.Postulacion.id = this.form.value.id;
      this.Postulacion.date = this.form.value.date;
      this.Postulacion.salary = this.form.value.salary;
      this.Postulacion.contractType = this.form.value.contractType;

      if (this.edicion) {
        this.pS.update(this.Postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.Postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.Router.navigate(['postulacion']);
    }
  }
init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
           id:new FormControl(data.id),
           date: new FormControl(data.date),
           state: new FormControl(data.state),
           acceptedcandidate:new FormControl(data.acceptedcandidate),
        });
      });
    }
  }
}

