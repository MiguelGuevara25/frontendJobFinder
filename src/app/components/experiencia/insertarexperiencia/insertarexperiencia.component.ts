import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Experiencia } from '../../../models/experiencia';
import { ExperienciaService } from '../../../services/experiencia.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertarexperiencia',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './insertarexperiencia.component.html',
  styleUrl: './insertarexperiencia.component.css',
})
export class InsertarexperienciaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  experiencia: Experiencia = new Experiencia();

  id: number = 0;
  edicion: boolean = false;

  constructor(
    private exS: ExperienciaService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      puesto: ['', Validators.required],
      empresa: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.experiencia.id = this.form.value.codigo;
      this.experiencia.job = this.form.value.puesto;
      this.experiencia.enterprise = this.form.value.empresa;
      this.experiencia.startDate = this.form.value.fechaInicio;
      this.experiencia.endDate = this.form.value.fechaFin;
      this.experiencia.description = this.form.value.descripcion;

      if (this.edicion) {
        this.exS.update(this.experiencia).subscribe(() => {
          this.exS.list().subscribe((data) => {
            this.exS.setList(data);
          });
        });
      } else {
        this.exS.insert(this.experiencia).subscribe(() => {
          this.exS.list().subscribe((data) => {
            this.exS.setList(data);
          });
        });
      }

      this.router.navigate(['/experiencias']);
    } else {
      this.form.markAllAsTouched();
      // Forzar animación shake si hay error
      this.triggerShake('name');
      if (this.edicion) this.triggerShake('id');
    }
  }

  init() {
    if (this.edicion) {
      this.exS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          puesto: new FormControl(data.job, Validators.required),
          empresa: new FormControl(data.enterprise, Validators.required),
          fechaInicio: new FormControl(data.startDate, Validators.required),
          fechaFin: new FormControl(data.endDate, Validators.required),
          descripcion: new FormControl(data.description, Validators.required),
        });
      });
    }
  }

  triggerShake(controlName: string) {
    const field = document.querySelector(`.form-control-${controlName}`);
    if (field) {
      field.classList.remove('shake');
      void (field as HTMLElement).offsetWidth; // Fuerza reflow
      field.classList.add('shake');
    }
  }
}
