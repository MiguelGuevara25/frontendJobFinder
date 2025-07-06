import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Postulacion } from '../../../models/postulacion';
import { PostulacionService } from '../../../services/postulacion.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ofertadetrabajo } from '../../../models/ofertadetrabajo';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditarpostulacion',
  imports: [MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    FormsModule,],
  templateUrl: './insertareditarpostulacion.component.html',
  styleUrl: './insertareditarpostulacion.component.css'
})
export class InsertareditarpostulacionComponent {
  form: FormGroup = new FormGroup({});
  postulacion: Postulacion = new Postulacion();
  listaofertadetrabajo: Ofertadetrabajo[]=[]


  id: number = 0;
  edicion: boolean = false;

  constructor(
    private pS: PostulacionService,
    private FormBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private oS: Ofertadetrabajo
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.FormBuilder.group({
      id: [''],
      date: ['', Validators.required],
      state: ['', Validators.required],
      acceptedcandidate: ['', Validators.required],
      oferta: ['', Validators.required]
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.postulacion.id = this.form.value.id;
      this.postulacion.date = this.form.value.date;
      this.postulacion.state = this.form.value.salary;
      this.postulacion.acceptedcandidate = this.form.value.contractType;
      this.postulacion.ofertaTrabajo.id = this.form.value.oferta


      if (this.edicion) {
        this.pS.update(this.postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.postulacion).subscribe(() => {
          this.pS.list().subscribe((data) => {
            this.pS.setList(data);
          });
        });
      }
      this.router.navigate(['postulacion']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          date: new FormControl(data.date),
          state: new FormControl(data.state),
          acceptedcandidate: new FormControl(data.acceptedcandidate),
        });
      });
    }
  }
  cancelar() {
    this.router.navigate(['postulacion']);
  }
}

